const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'35.227.146.173',
    user:'readonlyuser',
    password:'readonly',
    database:'cmpt470'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

process.on('SIGINT', function() {
    connection.end((err) => {
        if (err) throw err;
        console.log("\nConnection closed");
        process.exit(0);
    });
});

exports.connection = connection;
