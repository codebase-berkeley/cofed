const express = require('express');
const db = require('../../db/index');
const router = express.Router();

// This is an example SQL query - use this as a template
router.get('/coop/:CoopID', async (req, res) => {
  try {
    const x = req.params['CoopID'];
    const query = await db.query('SELECT * FROM coops WHERE id = ' + x);
    res.send(query.rows[0]);
  } catch (error) {
    console.log(error.stack);
  }
});

module.exports = router;
