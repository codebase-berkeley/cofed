const express = require('express');
const db = require('../../db/index');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltFactor = 10;
const passport = require('passport');
require('../passport-config');

// This is an example SQL query - use this as a template
router.get('/', async (req, res) => {
  try {
    const query = await db.query(
      `SELECT 'This is the root of authRouter.' as text;`
    );
    res.send(query.rows[0]['text']);
  } catch (error) {
    console.log(error.stack);
  }
});

router.post('/register', async (req, res) => {
  try {
    const { email, name, location, password } = req.body;
    const email_query = await db.query(
      `SELECT id FROM coops WHERE email = $1;`,
      [email]
    );
    //checks to ensure the email does not currently exist in the database
    if (email_query.rows.length == 0) {
      //generate salt
      let salt = await bcrypt.genSalt(saltFactor);
      //hash password
      let hashedPass = await bcrypt.hash(password, salt);
      //store co-op name, salt, hashed password, location
      const insert_query = db.query(
        `INSERT INTO coops (email, pass, coop_name, salt, addr)
        VALUES ($1, $2, $3, $4, $5)`,
        [email, hashedPass, name, salt, location]
      );
      res.send(insert_query.rows);
    } else {
      //send the error
      res
        .status(404)
        .send({ error: `${email} is already registered with an account` });
    }
  } catch (error) {
    console.log(error.stack);
  }
});

router.post('/login', passport.authenticate('local'), async (req, res) => {
  req.login(user, function (err) {
    if (err) {
      return res.redirect('/login');
    }
    return res.redirect('/');
  });
});

module.exports = router;
