const express = require('express');
const db = require('../../db/index');
const router = express.Router();

// This is an example SQL query - use this as a template
router.get('/profile', async (req, res) => {
  try {
    const query = await db.query(`SELECT * from coops;`);
    res.send(query.rows[0]);
  } catch (error) {
    console.log(error.stack);
  }
});

module.exports = router;
