const express = require('express');
const db = require('../../db/index');
const router = express.Router();

router.get('/coop/:CoopID', async (req, res) => {
  try {
    const id = req.params['CoopID'];
    const query = await db.query('SELECT * FROM coops WHERE id = ' + id);
    res.send(query.rows[0]);
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

  const text =
    'UPDATE coops SET coop_name = $3, addr = $4, ' +
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
  ];
  try {
    await db.query(text, values);
  } catch (err) {
    console.log(err.stack);
  }
});

router.get('/authen', async (req, res) => {
  // const email = req.params['email'];
  // const pass = req.params['password'];
  res.send(req.params['email']);

  const text = 'SELECT id FROM coops WHERE email=$1 AND pass=$2';
  const values = [email, pass];

  try {
    const query = await db.query(text, values);
    res.send(query.rows[0]);
  } catch (err) {
    console.log(err.stack);
  }
});

module.exports = router;
