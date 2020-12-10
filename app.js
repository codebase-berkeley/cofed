const express = require('express');
const indexRouter = require('./api/routes/index');
const authRouter = require('./api/routes/auth');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const path = require('path');
const pgSession = require('connect-pg-simple')(session);
const db = require('./db/index');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

// Body-parser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());

app.use(
  session({
    store: new pgSession({
      pool: db,
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_ID,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', indexRouter);
app.use('/auth', authRouter);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
