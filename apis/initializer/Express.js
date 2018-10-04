const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const expressValidator = require('express-validator');
// const expressStatusMonitor = require('express-status-monitor');
const chalk = require('chalk');

module.exports = function () {
  /**
   * Express configuration.
   */
  const app = express();
  app.disable('x-powered-by');
  app.set('host', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
  app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
  app.set('trust proxy', true);
  // app.use(expressStatusMonitor());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(expressValidator());
  if (process.env.NODE_ENV === 'production') {
    app.use(logger('combined'));
  } else {
    app.use(logger('dev'));
    app.use(errorHandler());
  }
  app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });

  return app;
};
