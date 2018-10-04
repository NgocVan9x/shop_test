const axios = require('axios');
const Checkit = require('cc-checkit');
const Errors = require('../utils/errors');
const db = require('../models');

const ProductController = {

  getProducts: async (req, res) => {
    const response = {}
    await db.products.findAll().then(products => {
      if (products.length>0) {
        response.data=products;
      }
    })
    return res.send(response);

  },
};


module.exports = ProductController;
