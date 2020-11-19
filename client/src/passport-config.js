const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../../db/index');
const bcrypt = require('bcrypt');

passport.serializeUser(function (user, done) {
  done(null, user.id);
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
  new LocalStrategy(function (username, password, done) {
    //get the password associated with the ENTERED username
    db.query(
      `SELECT pass 
        FROM coops 
        WHERE email = $1;`,
      [username],
      (err, result) => {
        //result is the password from the DATABASE
        if (err) {
          return done(err);
        }
        //if the username exists in the database
        if (result.rows.length > 0) {
          //get the query result
          const user = result.rows[0];
          console.log('===== USER =====');
          console.log(user);
          //compare the password in the DATABASE with the ENTERED password
          bcrypt.compare(password, user.pass, (err, res) => {
            //if successful return the user
            if (res) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        } else {
          done(null, false);
        }
      }
    );
  })
);

module.exports = passport;
