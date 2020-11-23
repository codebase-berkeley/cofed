const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/index');
const bcrypt = require('bcrypt');

passport.serializeUser(function (userId, done) {
  done(null, userId);
});

passport.deserializeUser(async function (id, done) {
  try {
    const query = await db.query(
      `SELECT * 
        FROM coops 
        WHERE id = $1;`,
      [id]
    );
    if (query.rows.length > 0) {
      return done(null, query.rows[0]);
    } else {
      return done(null, null);
    }
  } catch (err) {
    return done(err);
  }
});

passport.use(
  new LocalStrategy(async function (username, password, done) {
    let query = await db.query(
      `SELECT hashed_pass, id  
        FROM coops 
        WHERE email = $1;`,
      [username]
    );
    if (query.rows.length > 0) {
      const user = query.rows[0];
      let hashpass = user.hashed_pass;
      const passwordMatch = await bcrypt.compare(password, hashpass);
      if (passwordMatch) {
        return done(null, user.id);
      } else {
        return done(null, false);
      }
    } else {
      done(null, false);
    }
  })
);

module.exports = passport;
