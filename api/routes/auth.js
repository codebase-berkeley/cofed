const express = require('express');
const db = require('../../db/index');
const router = express.Router();
const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;
const passport = require('passport');
require('../passport-config');

router.post('/register', async (req, res) => {
  try {
    const { email, name, addr, password, latitude, longitude } = req.body;
    const emailQuery = await db.query(
      `SELECT id FROM coops WHERE email = $1;`,
      [email]
    );
    if (emailQuery.rows.length == 0) {
      let hashedPass = await bcrypt.hash(password, SALT_FACTOR);
      const insert_query = await db.query(
        `INSERT INTO coops (email, hashed_pass, coop_name, addr, latitude, longitude)
        VALUES ($1, $2, $3, $4, $5, $6)`,
        [email, hashedPass, name, addr, latitude, longitude]
      );
      res.send(insert_query.rows);
    } else {
      res
        .status(404)
        .send({ error: `${email} is already registered with an account` });
    }
  } catch (error) {
    console.log(error.stack);
  }
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
  })
);

router.post('/logout', async (req, res) => {
  req.logout();
  res.send('Logged Out');
});

module.exports = router;
