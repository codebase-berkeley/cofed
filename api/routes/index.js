const express = require('express');
const db = require('../../db/index');
const router = express.Router();
const format = require('pg-format');

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(404).send({ error: `user not logged in` });
  }
}

/** Returns an array of tags given a SQL query
 * map through an array, grab just the values of each dictionary,
 * and flatten the resulting array
 */
function getArrayOfTags(query) {
  return query.rows.map(Object.values).flat();
}
router.get('/coop', isAuthenticated, async (req, res) => {
  try {
    const id = req.user.id;
    var command =
      'SELECT tag_name FROM coop_tags JOIN tags ON coop_tags.tag_id = tags.id WHERE coop_tags.coop_id = $1';
    var values = [id];

    const queryTags = await db.query(command, values);
    const listOfTags = getArrayOfTags(queryTags);

    var command = 'SELECT * FROM coops WHERE id = $1';
    const query = await db.query(command, values);

    if (query.rows.length >= 1) {
      query.rows[0]['tags'] = listOfTags;
      res.send(query.rows[0]);
    } else {
      res.status(404).send({ error: `coop ${id} not found` });
    }
  } catch (error) {
    console.log(error.stack);
  }
});

//retrieving ALL tags in our tags table and returning a list
router.get('/tags', async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM tags;`);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

//retrieve all coops with their tag
router.get('/coops', isAuthenticated, async (req, res) => {
  try {
    const query = await db.query(`SELECT ARRAY(SELECT tag_name FROM coop_tags JOIN tags ON coop_tags.tag_id = tags.id WHERE coop_tags.coop_id= coops.id) AS tags,
    * FROM coops;`);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

//retrieve all coops with their tag
router.get('/filteredCoops', async (req, res) => {
  const tagParams = req.query.tags;

  try {
    const query = await db.query(
      `SELECT 
          ARRAY(
            SELECT tag_name 
            FROM coop_tags 
            JOIN tags ON coop_tags.tag_id = tags.id
            WHERE coop_tags.coop_id= coops.id)
          AS tags,
          * FROM coops WHERE ARRAY(
              SELECT tag_id 
              FROM coop_tags 
              JOIN tags 
              ON coop_tags.tag_id = tags.id 
              WHERE coop_tags.coop_id= coops.id
              )
             @> $1;`,
      [tagParams]
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

//retrieving ALL tags in our tags table and returning a list
router.get('/tags', async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM tags;`);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

//retrieve the co-ops and their starred attribute
router.get('/getStarred', isAuthenticated, async (req, res) => {
  const starrerId = req.user.id;

  try {
    const query = await db.query(
      `SELECT starred_coop_id 
      FROM stars 
      WHERE starrer_coop_id = $1;`,
      [starrerId]
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

//post new starred
router.post('/addStar', isAuthenticated, async (req, res) => {
  const { starredId } = req.body;
  const starrerId = req.user.id;
  try {
    const query = await db.query(
      `INSERT INTO stars (starred_coop_id, starrer_coop_id)
        VALUES ($1, $2);`,
      [starredId, starrerId]
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

//delete star
router.delete('/delete', isAuthenticated, async (req, res) => {
  const { starredId } = req.body;
  const starrerId = req.user.id;
  try {
    const query = await db.query(
      `DELETE FROM stars 
      WHERE starred_coop_id = $1 
      AND starrer_coop_id = $2;`,
      [starredId, starrerId]
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

router.put('/coop', isAuthenticated, async (req, res) => {
  const coopId = req.user.id;
  const {
    coop_name,
    addr,
    phone_number,
    mission_statement,
    description_text,
    insta_link,
    fb_link,
    website,
    email,
    profile_pic,
    tags,
  } = req.body;

  const updateQueryText =
    'UPDATE coops SET email = $2, coop_name = $3, addr = $4, ' +
    'phone_number = $5, mission_statement = $6, description_text = $7,' +
    'insta_link = $8, fb_link = $9, website = $10, profile_pic = $11 WHERE id = $1';
  const updateQueryValues = [
    coopId,
    email,
    coop_name,
    addr,
    phone_number,
    mission_statement,
    description_text,
    insta_link,
    fb_link,
    website,
    profile_pic,
  ];

  try {
    await db.query(updateQueryText, updateQueryValues);

    await db.query('DELETE FROM coop_tags WHERE coop_id = $1', [coopId]);

    var namesToIds = await db.query(
      'SELECT id from tags WHERE tag_name = ANY ($1)',
      [tags]
    );
    namesToIds = namesToIds.rows.map(dict => [coopId, dict['id']]);
    if (namesToIds.length > 0) {
      const query1 = format(
        `INSERT INTO coop_tags (coop_id, tag_id) VALUES %L`,
        namesToIds
      );
      await db.query(query1);
    }

    res.send(`Successfully updated coop ${coopId}`);
  } catch (err) {
    console.log(err.stack);
  }
});

module.exports = router;
