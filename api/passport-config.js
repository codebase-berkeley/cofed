const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/index');
const bcrypt = require('bcrypt');

passport.serializeUser(function (user, done) {
  //done(null, user.id);
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  db.query(
    `SELECT * 
          FROM coops 
          WHERE id = $1;`,
    [id],
    (err, user) => {
      done(err, user);
    }
  );
});

passport.use(
  new LocalStrategy(async function (username, password, done) {
    //get the password associated with the ENTERED username
    let query = await db.query(
      `SELECT hashed_pass 
        FROM coops 
        WHERE email = $1;`,
      [username]
    );
    //result is the password from the DATABASE
    if (query.rows.length > 0) {
      //get the query result
      const user = query.rows[0];
      //compare the password in the DATABASE with the ENTERED password
      // let salt = bcrypt.genSalt(10);
      // let hashpass1 = bcrypt.hash('test', salt);
      // console.log(hashpass1);
      // let hashpass2 = bcrypt.hash('test', salt);
      const passwordMatch = user.hashed_pass == password; //await bcrypt.compare(password, user.hashed_pass)
      //if successful return the user
      console.log('===== MATCH? =====');
      console.log(passwordMatch);
      if (passwordMatch) {
        console.log('===== HERE =====');
        return done(null, user);
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
