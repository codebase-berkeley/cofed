const { Pool } = require('pg');
const pool = new Pool({ database: 'cofed' });

require('dotenv').config();

module.exports = pool;
