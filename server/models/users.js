const connection = require('./index').connection;

exports.getByUsername = (username, callback) => {
    connection.query('SELECT * from users WHERE username = ?', [username], (err, res) => {
        if (err) throw err;
        callback(null, res);
    });
};