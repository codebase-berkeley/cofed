const express = require('express');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = 8000;

// Body-parser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes - may need to add more
app.use('/api', indexRouter);
app.use('/auth', authRouter);

// TODO: Remove cors after development
app.use(cors({ credentials: true, origin: 'https://localhost:8000' }));

app.get('/', (req, res) => res.send('Hello, world!'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
