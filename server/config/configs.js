/**
 * Module dependencies.
 */
const express = require('express');
const logger = require('morgan');
const router = require('./routes');
const path = require('path');
const errorHandler = require('errorhandler');
const session = require('express-session');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
require('dotenv').config({path: path.join(__dirname, '../.env')})

/**
 * Export our configuration
 */
module.exports = app => {
  app.use(session({
    secret: 'finalproject',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
  }));
  app.use(logger('dev'));
  app.use(errorHandler());
  app.use(express.json());
  app.set('port', process.env.PORT || 8080);
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname,'../client')));
  app.use('/', router);
};
