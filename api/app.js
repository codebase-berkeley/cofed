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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_ID,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes - may need to add more
app.use('/api', indexRouter);
app.use('/auth', authRouter);

module.exports = app;
