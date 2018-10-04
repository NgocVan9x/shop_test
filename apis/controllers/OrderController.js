const axios = require('axios');
const Checkit = require('cc-checkit');
const Errors = require('../utils/errors');
const db = require('../models');

const OrderController = {

  handleGetOrders: async (req, res) => {

    const response = {}
    await db.carts.findAll({ include: [ db.products ] , where: { odered: 1 } }).then(carts => {
      if (carts.length>0) {
        response.data=carts;
      }
    })
    return res.send(response);

  },
};


module.exports = OrderController;
