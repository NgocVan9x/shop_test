const _ = require('lodash');
const routers = require('./api');

module.exports = (app) => {
  _.map(routers, (router, method) => {
    _.map(router, (functionNames, key1) => {
      _.map(functionNames, (functionName, key2) => {
        const controllers = functionName.split('.');
        if (controllers.length < 2) {
          console.log('cannot use controller');
          return;
        }
        const controller = require(`../controllers/${controllers[0]}`); // eslint-disable-line import/no-dynamic-require
        app[method.toLowerCase()](`/${key1}/${key2}`, controller[controllers[1]]);
      });
    });
  });
};
