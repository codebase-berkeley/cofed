const express = require('express');
const db = require('../../db/index');
const router = express.Router();

router.get('/coop/:CoopID', async (req, res) => {
  try {
    const id = req.params['CoopID'];

    const queryTags = await db.query(
      'SELECT tag_name FROM coop_tags JOIN tags ON coop_tags.tag_id = tags.id WHERE coop_tags.coop_id=' +
        id
    );
    const query = await db.query('SELECT * FROM coops WHERE id = ' + id);

    //extract the tags from queryTags.rows into an array of tags
    const listOfDictTags = Object.values(queryTags.rows);

    //helper function that returns the value in the dictionary
    function getValue(d) {
      for (var key in d) {
        return d[key];
      }
    }
    var listOfTags = listOfDictTags.map(getValue);

    //put the array of tags into the query.rows[0] dictionary
    query.rows[0]['tags'] = listOfTags;

    res.send(query.rows[0]);

    // res.send(ans);
  } catch (error) {
    console.log(error.stack);
  }
});

router.post('/coop', async (req, res) => {
  const id = parseInt(req.body.id, 10);
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
  const id = parseInt(req.body.id, 10);
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
    'UPDATE coops SET tags = $12, coop_name = $3, addr = $4, ' +
    'phone_number = $5, mission_statement = $6, description_text = $7,' +
    'insta_link = $8, fb_link = $9, website = $10, email = $2, profile_pic = $11 WHERE id = $1';
  const values = [
    id,
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
    tags,
  ];

  //input: tags = [TAG1, TAG2]

  //very easy to get with helper function: tagsDatabase = [TAG1, TAG2, TAG3]

  //add = [TAG 4]
  //find the tag's id
  // - tag_id = SELECT id FROM tags WHERE tag_name = 'THE FOURTH TAG'
  //find the overall id
  // - new_id = SELECT id FROM coop_tags ORDER BY id DESC LIMIT 1;
  //insert new row into coop_tags
  // - INSERT INTO coop_tags VALUES (new_id, coop_id, tag_id);

  //diff = [TAG 3]
  //use TAG 3 and the tags table to find id (the tag's id)
  //DELETE FROM coop_tags WHERE coop_id = coopid AND tag_id = id (from above)
  //find the tag id to delete
  // - tag_idee = SELECT id FROM tags WHERE tag_name = 'THE THIRD TAG'
  //delete it from the coops_tag table
  // - DELETE FROM coop_tags WHERE coop_id = 1 AND tag_id = tag_idee;

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
