const express = require('express');
const db = require('../../db/index');
const router = express.Router();

// This is an example SQL query - use this as a template
router.get('/', async (req, res) => {
  try {
    console.log('hello!');
    const query = await db.query(`SELECT 'this is dummy text' as text;`);
    // res.send(query);
    // res.send('hello!');
    res.send(query.rows[0]['text']);
  } catch (error) {
    console.log(error.stack);
  }
});

module.exports = router;
