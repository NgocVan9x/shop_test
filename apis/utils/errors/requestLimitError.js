const KError = require('./kError');

module.exports = class requestLimitError extends KError {
  constructor(expiry) {
    super();
    this.additional_data = `Retry in ${expiry} seconds`;
    this.reason = 'request_limit';
  }
};
