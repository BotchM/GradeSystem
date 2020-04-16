// require express
const express = require('express');
const multer = require('multer');

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
    if (req.session && req.session.user === "amy" && req.session.admin)
      return next();
    else
      return res.sendStatus(401);
};

/**
 * Controllers (route handlers).
 */
const homeController = require('../controllers/homeController');
const userController = require('../controllers/userController');
const csvController = require('../controllers/csvController');


app.get('/', homeController.index);

/**
 * User routes
 */
app.post('/login', userController.login);
app.get('/logout', userController.logout);

/**
 * CSV routes
 */
app.get('/upload', csvController.upload);
app.post('/upload', upload.single('csv'), csvController.process);
app.get('/dashboard', csvController.dashboard);
  
module.exports = app;
