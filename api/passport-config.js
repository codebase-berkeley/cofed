const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/index');
const bcrypt = require('bcrypt');
const saltFactor = 10;

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
    return done(err, null);
  }
});

passport.use(
  new LocalStrategy(async function (username, password, done) {
    //get the password associated with the ENTERED username
    let query = await db.query(
      `SELECT hashed_pass, id  
        FROM coops 
        WHERE email = $1;`,
      [username]
    );
    //result is the password from the DATABASE
    if (query.rows.length > 0) {
      //get the query result
      const user = query.rows[0];
      //compare the password in the DATABASE with the ENTERED password
      // you should be hashing it when you're putting it INTO the database, not when you're pulling it out. so you might need to modify your register logic -richard
      // in fact, just delete the INSERT INTO lines in cofed.sql and make your own users
      let hashpass = user.hashed_pass; //await bcrypt.hash(user.hashed_pass, saltFactor);
      const passwordMatch = await bcrypt.compare(password, hashpass);
      //if successful return the user
      if (passwordMatch) {
        console.log('===== MATCHED PASSWORD =====');
        return done(null, user.id);
      } else {
        console.log('PASSWORD = ' + password);
        console.log('INCORRECT PASS: ' + user.hashed_pass);
        return done(null, false);
      }
    } else {
      done(null, false);
    }
  })
);

module.exports = passport;
