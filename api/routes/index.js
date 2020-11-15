const express = require('express');
const db = require('../../db/index');
const router = express.Router();

/** Returns an array of tags given a SQL query
 *
 */
function getArrayOfTags(query) {
  //extract the tags from queryTags.rows into an array of tags
  const listOfDictTags = Object.values(query.rows);

  //helper function that returns the value in the dictionary
  function getValue(d) {
    for (var key in d) {
      return d[key];
    }
  }

  var listOfTags = listOfDictTags.map(getValue);
  return listOfTags;
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

    var queryTags = await db.query(
      'SELECT tag_name FROM coop_tags JOIN tags ON coop_tags.tag_id = tags.id WHERE coop_tags.coop_id=' +
        id
    );
    const query = await db.query('SELECT * FROM coops WHERE id = ' + id);

    var listOfTags = getArrayOfTags(queryTags);

    query.rows[0]['tags'] = listOfTags;

    res.send(query.rows[0]);
  } catch (error) {
    console.log(error.stack);
  }
});

router.post('/coop', async (req, res) => {
  var idQuery = await db.query('SELECT id FROM coops ORDER BY id DESC LIMIT 1');
  var id = getArrayOfTags(idQuery)[0] + 1;
  const email = req.body.email;
  const name = req.body.name;
  const addr = req.body.addr;
  const pass = req.body.pass;

  const text =
    'INSERT INTO coops(id, email, pass, coop_name, addr) VALUES($1, $2, $3, $4, $5)';
  const values = [id, email, pass, name, addr];
  try {
    await db.query(text, values);
  } catch (err) {
    console.log(err.stack);
  }
});

router.put('/coop', async (req, res) => {
  const coopId = parseInt(req.body.id, 10);
  const name = req.body.name;
  const addr = req.body.addr;
  const phone = req.body.phone;
  const mission = req.body.mission;
  const description = req.body.description;
  const insta = req.body.insta;
  const fb = req.body.fb;
  const web = req.body.web;
  const email = req.body.email;
  const photo = req.body.photo;
  const tags = req.body.tags;

  const text =
    'UPDATE coops SET coop_name = $3, addr = $4, ' +
    'phone_number = $5, mission_statement = $6, description_text = $7,' +
    'insta_link = $8, fb_link = $9, website = $10, email = $2, profile_pic = $11 WHERE id = $1';
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
  //addArray = diffArray(tags, listOfTagsDatabase);

  //for every tag in the deleteArray
  for (var i = 0; i < deleteArray.length; i++) {
    var tagNameFromArray = deleteArray[i];
    var command = 'SELECT id FROM tags WHERE tag_name = $1';
    var value = [tagNameFromArray];

    //find the tag id to delete
    var query = await db.query(command, value);
    var tag_idee = getArrayOfTags(query)[0];

    //delete the tag from the coops_tag table
    command = 'DELETE FROM coop_tags WHERE coop_id = $1 AND tag_id = $2';
    value = [coopId, tag_idee];
    await db.query(command, value);
  }

  //for each tag to add:
  //find the tag's id
  // - tag_id = SELECT id FROM tags WHERE tag_name = 'THE FOURTH TAG'
  //find the overall id
  // - new_id = SELECT id FROM coop_tags ORDER BY id DESC LIMIT 1;
  //insert new row into coop_tags
  // - INSERT INTO coop_tags VALUES (new_id, coop_id, tag_id);

  try {
    await db.query(text, values);
  } catch (err) {
    console.log(err.stack);
  }
});

router.post('/authen', async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
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
