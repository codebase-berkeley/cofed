const { Pool } = require('pg');
const pool = new Pool();

require('dotenv').config();

module.exports = pool;
