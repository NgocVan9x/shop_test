const Utils = require('../utils');

module.exports = (req, res, next) => {
  Utils.cors(res);
  return next();
};
