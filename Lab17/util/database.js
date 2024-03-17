const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'stardewvalley',
    password: 'root',
});

module.exports = pool.promise(); 