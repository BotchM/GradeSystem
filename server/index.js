/**
 * Module dependencies.
 */
const express            = require('express');
const chalk              = require('chalk');
const config             = require('./config/configs');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
config(app, express);
/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});