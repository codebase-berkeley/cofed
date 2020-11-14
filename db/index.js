const { Pool } = require('pg');
const pool = new Pool({ database: 'cofed' });

require('dotenv').config();

// const pool = new Pool();

module.exports = pool;
