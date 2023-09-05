const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'eltee123',
    host: 'localhost',
    port: 5432,
    database: 'GetLeagued'
});

module.exports = pool;