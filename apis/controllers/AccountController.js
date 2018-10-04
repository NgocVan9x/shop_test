const axios = require('axios');
const async = require('async');
const Checkit = require('cc-checkit');
const Utils = require('../utils');
const Errors = require('../utils/errors');
const db = require('../models');

const AccountController = {
  login: async (req, res) => {
    const [err, params] = new Checkit({
      email: ['string', 'required'],
      password: ['string', 'required'],
    }).validateSync(req.body);

    const isError = req.body.isError;
    if (isError || err) {
      return res.send(500, new Errors.ParamError(err || 'Api parameter fails'));
    }
    const response = {};
    let error = null;
    await db.users.findOne({ where: { email: params.email, password: params.password } }).then(async user => {
      if (user) {
        response.data = user;
      } else {
        error = "fails"
      }
    })
    if (error) {
      return res.send(500, new Errors.ServerError(error))
    }
    return res.send(response);
  },
};
module.exports = AccountController;
