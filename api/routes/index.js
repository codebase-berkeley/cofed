const express = require('express');
const db = require('../../db/index');
const router = express.Router();
const format = require('pg-format');
const AWS = require('aws-sdk');
const bluebird = require('bluebird');
// Create S3 service object
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

/** configure AWS to work with promises */
AWS.config.setPromisesDependency(bluebird);
const s3 = new AWS.S3();

const coop_fields =
  'id, email, hashed_pass, coop_name, phone_number, addr, ' +
  'latitude, longitude, website, mission_statement, ' +
  'description_text, profile_pic, insta_link, fb_link';

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).send({ error: `user not logged in` });
  }
}

router.get('/coop', isAuthenticated, async (req, res) => {
  try {
    const id = req.user.id;
    const commandForTags =
      'SELECT tag_name FROM coop_tags JOIN tags ON coop_tags.tag_id = tags.id WHERE coop_tags.coop_id = $1';

    const values = [id];
    const queryTags = await db.query(commandForTags, values);

    const command = 'SELECT ' + coop_fields + ' FROM coops WHERE id = $1';
    const query = await db.query(command, values);

    if (query.rows.length >= 1) {
      query.rows[0]['tags'] = queryTags.rows.map(dict => dict['tag_name']);
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
    const query = await db.query(
      `SELECT categories, array_agg(tags) FROM categories, tags WHERE tags.category_id = categories.id GROUP BY categories.id;`
    );
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

// //retrieve all coops with their tag
router.get('/coops', isAuthenticated, async (req, res) => {
  try {
    const query = await db.query(
      'SELECT ARRAY(SELECT tag_name FROM coop_tags JOIN tags ON coop_tags.tag_id = tags.id WHERE coop_tags.coop_id= coops.id) AS tags, ' +
        coop_fields +
        ' FROM coops;'
    );
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
          AS tags, ` +
        coop_fields +
        ` FROM coops WHERE ARRAY(
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
    latitude,
    longitude,
  } = req.body;

  const updateQueryText =
    'UPDATE coops SET email = $2, coop_name = $3, addr = $4, ' +
    'phone_number = $5, mission_statement = $6, description_text = $7,' +
    'insta_link = $8, fb_link = $9, website = $10, profile_pic = $11, latitude = $12, longitude = $13 WHERE id = $1';
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
    latitude,
    longitude,
  ];
  try {
    //HANDLE TAG UPDATES
    await db.query('BEGIN');
    await db.query(updateQueryText, updateQueryValues);

    await db.query('DELETE FROM coop_tags WHERE coop_id = $1', [coopId]);

    let namesToIds = await db.query(
      'SELECT id from tags WHERE tag_name = ANY ($1)',
      [tags]
    );
    namesToIds = namesToIds.rows.map(dict => [coopId, dict['id']]);
    if (namesToIds.length > 0) {
      const queryInsertTags = format(
        `INSERT INTO coop_tags (coop_id, tag_id) VALUES %L`,
        namesToIds
      );
      await db.query(queryInsertTags);
    }
    await db.query('COMMIT');
    res.send(`Successfully updated coop ${coopId}`);
  } catch (err) {
    await db.query('ROLLBACK');
    console.log(err.stack);
  }
});

router.post('/upload', async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    console.log('No files were uploaded.');
  }

  const { imageFile } = req.files;
  const { coop } = req.body;

  // the RETURNING id is used for dynamically rendering the lesson box after uploading
  let type = imageFile.mimetype;
  let key = coop + '/' + imageFile.name;
  const params = {
    ACL: 'public-read',
    Bucket: process.env.S3_BUCKET,
    Body: imageFile.data,
    ContentType: type,
    Key: key,
  };
  s3.upload(params, (err, data) => {
    if (err) {
      console.log('Error in callback');
      console.log(err);
    }

    res.send('Success!');
  });
});

module.exports = router;
