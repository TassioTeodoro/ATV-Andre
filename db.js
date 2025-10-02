require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // ou use host, user, password, database, port
    // ssl: { rejectUnauthorized: false } // descomente se for necessário (por exemplo em Heroku)
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};
