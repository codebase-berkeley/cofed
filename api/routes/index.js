const express = require('express');
const db = require('../../db/index');
const router = express.Router();

// This is an example SQL query - use this as a template

router.get('/coop/:CoopID', async (req, res) => {
  try {
    const id = req.params['CoopID'];
    const query = await db.query('SELECT * FROM coops WHERE id = ' + id);
    res.send(query.rows[0]);
  } catch (error) {
    console.log(error.stack);
  }
});

// This is an example SQL query - use this as a template
router.post('/coop/:CoopID/:email', async (req, res) => {
  try {
    const id = req.params['CoopID'];
    const email = req.params['email'];
    const name = req.params['name'];
    const addr = req.params['addr'];
    const pass = req.params['pass'];

    let v =
      '(' + id + ', ' + email + ', ' + name + ', ' + addr + ', ' + pass + ')';
    res.send(v);
    await db.query(
      'INSERT INTO coops (id, email, pass, coop_name) VALUES ' + v
    );
  } catch (error) {
    console.log(error.stack);
  }
});
module.exports = router;
