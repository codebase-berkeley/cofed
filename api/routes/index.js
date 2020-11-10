const express = require('express');
const db = require('../../db/index');
const router = express.Router();

// This is an example SQL query - use this as a template
router.get('/', async (req, res) => {
  try {
    const query = await db.query(
      `SELECT 'This is the root of indexRouter.' as text;`
    );
    res.send(query.rows[0]['text']);
  } catch (error) {
    console.log(error.stack);
  }
});

//retrieving ALL co-ops in our coops table
router.get('/coops', async (req, res) => {
  try {
    const query = await db.query(`SELECT * FROM coops;`);
    res.send(query.rows[0]);
  } catch (error) {
    console.log(error.stack);
  }
});

module.exports = router;
