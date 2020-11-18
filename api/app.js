const express = require('express');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

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

module.exports = app;
