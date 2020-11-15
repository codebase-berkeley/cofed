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
    res.send(query.rows); //.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

//retrieve the co-ops and their starred attribute
router.get('/getStarred', async (req, res) => {
  //const {starredId} = req.params.starredId
  //console.log("PARAMS = " + starredId)
  try {
    const query = await db.query(
      //DONE: use get the id's of the starred co-ops
      // `SELECT *, starred_coop_id
      // FROM coops LEFT JOIN stars 
      // on coops.id = $1;`,
      `SELECT starred_coop_id 
      FROM stars 
      WHERE starrer_coop_id = 1;`//,
      //[starredId]
    );
    console.log(query.rows);
    res.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

//post new starred
router.post('/addStar', async (request, response) => {
  try {
    const query = await db.query(
      `INSERT INTO stars (starred_coop_id, starrer_coop_id))
        VALUES ($1, $2)
        RETURNING *;`,
      [request.body.starred_coop_id, request.body.starrer_coop_id]
    );
    response.send(query.rows);
  } catch (error) {
    console.log(error.stack);
  }
});

//delete star
router.delete('/delete', async (req, res) => {
  const { starredId } = req.params;
  const { starrerId } = req.params;
  try {
    const query = await db.query(
      //DONE: delete row from stars table
      `DELETE FROM stars 
      WHERE starred_coop_id = $1 
      AND starrer_coop_id = $2;`,
      [request.body.starredId, request.body.starrerId]
    );
    res.send(`Successfully deleted star`);
  } catch (error) {
    console.log(error.stack);
  }
});

module.exports = router;
