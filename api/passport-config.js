const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
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
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8000/auth/google/callback',
    },
    async function (token, tokenSecret, profile, done) {
      let email = profile.emails[0].value;
      let name = profile.displayName;
      let query = await db.query(
        `SELECT id
          FROM coops
          WHERE email = $1;`,
        [email]
      );
      if (query.rows.length > 0) {
        const user = query.rows[0];
        return done(null, user.id);
      } else {
        await db.query(
          'INSERT INTO coops (email, coop_name, addr, ' +
            'phone_number, mission_statement, description_text,' +
            'insta_link, fb_link, website, latitude, longitude, profile_pic) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
          [
            email,
            '[' + name + "'s Coop]",
            '[Insert address]',
            '[Insert Phone Number]',
            '[Insert Mission Statement]',
            '[Insert Description]',
            '[Insert Instagram Link]',
            '[Insert Facebook Link]',
            '[Insert Website]',
            37.8712,
            -122.2601, // defaults to Berkeley!
            'user_default.png',
          ]
        );
        const query = await db.query(
          `SELECT id
            FROM coops
            WHERE email = $1;`,
          [email]
        );
        const user = query.rows[0];
        return done(null, user.id);
      }
    }
  )
);

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
