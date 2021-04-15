var mariadb = require('mariadb');

const pool = mariadb.createPool({
    host:'localhost',
    port:'3308',
    database: 'ojt',
    user:'root',
    password:'root'
});

module.exports = pool;