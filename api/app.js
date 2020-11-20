const express = require('express');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const app = express();
const port = 8000;

// Body-parser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - may need to add more
app.use('/api', indexRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// function isAuthenticated(req, res, next) {
//   // do any checks you want to in here

//   // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
//   // you can do this however you want with whatever variables you set up
//   if (req.user.authenticated) {
//     return next();
//   } else {
//     res.status(404).send({ error: `user not logged in` });
//   }
//   // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
// }

app.use(
  session({ resave: false, saveUninitialized: false, secret: 'keyboard cat' })
);
app.use(passport.initialize());
app.use(passport.session());

module.exports = app;
