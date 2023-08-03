import mysql from 'mysql';

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    port     : process.env.DB_PORT
});

export default connection;