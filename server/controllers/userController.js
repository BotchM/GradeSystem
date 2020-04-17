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
            res.redirect('/');
        }else {
            if(result[0].password === password){
                req.session.user = result[0];
                res.redirect('/upload');
            }else{
                res.redirect('/');
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
        res.clearCookie('connect.sid');
        res.send('Logged out');
    });
}