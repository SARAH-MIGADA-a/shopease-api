const { Pool } = require('pg');

const pool = new Pool({
  user: 'sarah',
  host: 'localhost',
  database: 'shopease_db',
  password: '2003',
  port: 5432,
});

module.exports = pool;
