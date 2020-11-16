const express = require('express');
const db = require('../../db/index');
const router = express.Router();

/** Returns an array of tags given a SQL query
 * map through an array,
 * grab just the values of each dictionary,
 *  and flatten the resulting array
 */
function getArrayOfTags(query) {
  return query.rows.map(Object.values).flat();
}

/** Returns the difference between two arrays
 *  Returns an array of objects in Array1
 *  That are not in Array2
 */
function diffArray(arr1, arr2) {
  var n = arr1.filter(x => !arr2.includes(x));
  return n;
}

router.get('/coop/:CoopID', async (req, res) => {
  try {
    const id = req.params['CoopID'];
    var command =
      'SELECT tag_name FROM coop_tags JOIN tags ON coop_tags.tag_id = tags.id WHERE coop_tags.coop_id= $1';
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

router.post('/coop', async (req, res) => {
  const { email, name, addr, pass } = req.body;

  const text =
    'INSERT INTO coops( email, pass, coop_name, addr) VALUES($1, $2, $3, $4)';
  const values = [email, pass, name, addr];
  try {
    await db.query(text, values);
  } catch (err) {
    console.log(err.stack);
  }
});

router.put('/coop', async (req, res) => {
  const coopId = parseInt(req.body.id, 10);
  const {
    name,
    addr,
    phone,
    mission,
    description,
    insta,
    fb,
    web,
    email,
    photo,
    tags,
  } = req.body;

  const text =
    'UPDATE coops SET email = $2, coop_name = $3, addr = $4, ' +
    'phone_number = $5, mission_statement = $6, description_text = $7,' +
    'insta_link = $8, fb_link = $9, website = $10, profile_pic = $11 WHERE id = $1';
  const values = [
    coopId,
    email,
    name,
    addr,
    phone,
    mission,
    description,
    insta,
    fb,
    web,
    photo,
  ];

  var queryTags = await db.query(
    'SELECT tag_name FROM coop_tags JOIN tags ON coop_tags.tag_id = tags.id WHERE coop_tags.coop_id=' +
      coopId
  );
  var listOfTagsDatabase = getArrayOfTags(queryTags);

  deleteArray = diffArray(listOfTagsDatabase, tags);
  addArray = diffArray(tags, listOfTagsDatabase);

  //TO DO:
  //for each tag to add:
  //find the tag's id
  // - tag_id = SELECT id FROM tags WHERE tag_name = 'THE FOURTH TAG'
  //find the overall id
  // - new_id = SELECT id FROM coop_tags ORDER BY id DESC LIMIT 1;
  //insert new row into coop_tags
  // - INSERT INTO coop_tags VALUES (new_id, coop_id, tag_id);

  try {
    await db.query(
      `DELETE FROM coop_tags WHERE coop_id = $1 AND tag_id IN (SELECT id from tags WHERE tag_name = ANY ($2));`,
      [coopId, deleteArray]
    );

    await db.query(text, values);
  } catch (err) {
    console.log(err.stack);
  }
});

router.post('/authen', async (req, res) => {
  const { email, pass } = req.body;
  const text = 'SELECT id FROM coops WHERE email = $1 AND pass = $2';
  const values = [email, pass];

  try {
    const query = await db.query(text, values);
    res.send(query.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
});

module.exports = router;
