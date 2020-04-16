const Users        = require('../models/users')
const crypt        = require('../utils/crypto');
const path = require('path');

/**
 * POST /
 * Login User
 */
exports.login = async (req, res) => {
    const username = req.body.username,
          password = crypt.getHash(req.body.password);
    
    Users.getByUsername(username, (err, result) => {
        if (err) throw err;

        if(result.length == 0) {
            res.sendFile(path.join(__dirname, '../client/', '/index.html'));
        }else {
            if(result[0].password === password){
                req.session.user = result[0];
                res.redirect('/upload');
            }else{
                res.sendFile(path.join(__dirname, '../client/', '/index.html'));
            }
        }
    })
}

/**
 * POST /
 * Logout User
 */
exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
}