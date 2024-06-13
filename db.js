const mysql = require('mysql');

const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hanghout'
});

module.exports = pool;
