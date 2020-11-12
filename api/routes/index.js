const express = require('express');
const db = require('../../db/index');
const router = express.Router();

router.get('/coop/:CoopID', async (req, res) => {
  try {
    const id = req.params['CoopID'];
    const query = await db.query('SELECT * FROM coops WHERE id = ' + id);
    res.send(query.rows[0]);
  } catch (error) {
    console.log(error.stack);
  }
});

router.post('/coop', async (req, res) => {
  const id = parseInt(req.body.id, 10);
  const email = req.body.email;
  const name = req.body.name;
  const addr = req.body.addr;
  const pass = req.body.pass;

  // let v =
  //   '(' + id + ', ' + email + ', ' + name + ', ' + addr + ', ' + pass + ')';
  // await db.query(
  //   'INSERT INTO coops (id, email, pass, coop_name) VALUES ' + v
  // );

  const text =
    'INSERT INTO coops(id, email, pass, coop_name, addr) VALUES($1, $2, $3, $4, $5)';
  const values = [id, email, pass, name, addr];
  try {
    await db.query(text, values);
  } catch (err) {
    console.log(err.stack);
  }
});
module.exports = router;
