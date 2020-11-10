const { Pool } = require('pg');

require('dotenv').config();

const pool = new Pool();

module.exports = pool;
