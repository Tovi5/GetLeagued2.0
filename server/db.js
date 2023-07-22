const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: 'postgres',
    password: 'eltee123',
    host: 'localhost',
    port: 5432,
    database: 'GetLeagued'
});

module.exports = pool;