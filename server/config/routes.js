// require express
const express = require('express');
const multer = require('multer');
const Users        = require('../models/users')

// create our router object
const app = express.Router();

/**
 * Tmp place for csv file
 */
const upload = multer({ dest: 'tmp/csv/' });

/**
 * Middleware
 */
const auth = (req, res, next) => {
  if (req.session && req.session.user) {
    Users.getByUsername(req.session.user.username, (err, result) => {
      if (err) throw err;

      if(result.length == 0) {
        res.redirect('/login');
      }else {
        req.user = result[0];
        delete req.user.password;
        req.session.user = result[0];
        next();
      }
      next();
    })
  }
}

const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

/**
 * Controllers (route handlers).
 */
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const csvController = require('../controllers/csvController');


app.get('/', requireLogin, homeController.index);

/**
 * User routes
 */
app.post('/login', userController.login);
app.post('/logout', userController.logout);

/**
 * CSV routes
 */
app.get('/upload', requireLogin, csvController.upload);
app.post('/upload', requireLogin, upload.single('csv'), csvController.process);
app.get('/dashboard', requireLogin, csvController.dashboard);
  
module.exports = app;
