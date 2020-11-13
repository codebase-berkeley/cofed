const { Pool } = require('pg');
<<<<<<< HEAD
const pool = new Pool({ database: 'cofed' });
=======
>>>>>>> cf80176906a4512777dc43d2a06f1678f056f3a1

require('dotenv').config();

const pool = new Pool();

module.exports = pool;
