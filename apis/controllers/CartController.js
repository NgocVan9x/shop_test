const _ = require('lodash');
const async = require('async');
const Errors = require('../utils/errors');
const Checkit = require('cc-checkit');
const db = require('../models');

const CartController = {
  handleGetCartsByUser: async (req, res) => {
    const [err, params] = new Checkit({
      user_id: ['integer', 'required'],
    }).validateSync(req.query);
    const isError = req.query.isError;
    if (isError || err) {
      return res.send(new Errors.ParamError(err));
    }
     const response = {}
    await db.users.findById(params.user_id).then( async user => {
      if (user) {
        await db.carts.findAll({ include: [ db.products ] ,where: { users_id: user.id, odered: 0 } }).then(carts => {
          if (carts.length>0) {
            response.data=carts;
          }
        })
      }
    })
    return res.send(response);
  },
  handleNewCart: async (req, res) => {
    const [err, params] = new Checkit({
      users_id: ['integer', 'required'],
      products_id: ['integer', 'required'],
    }).validateSync(req.body);
    const isError = req.body.isError;
    if (isError || err) {
      return res.send(new Errors.ParamError(err));
    }
    let error = null;
    const response = {}
    await db.users.findById(params.users_id).then( async user => {
      if (user) {
        await db.products.findById(params.products_id).then(async product => {
          if (product) {
              await db.carts.findOne({ include: [ db.products ] ,where: { users_id: user.id, odered: 0, products_id: product.id } }).then(async cart=>{
                if(cart){
                  await cart.update({quantity:cart.quantity+1});
                }else{
                  await db.carts.create({users_id: user.id, quantity: 1, products_id: product.id}).then(cart_new =>console.log(cart_new))
                }
                response.message="susscces"
              })
          }else{
            error = "products not found"
          }
        })
      }
      else{
        error = "users not found"
      }
    })
    if(error){
      return res.send(new Errors.ServerError(error));
    }
    return res.send(response);
  },
  handleUpdateCart: async (req, res) => {
    const [err, params] = new Checkit({
      carts_id: ['integer', 'required'],
    }).validateSync(req.body);
    const isError = req.body.isError;
    if (isError || err) {
      return res.send(new Errors.ParamError(err));
    }
    const response = {}
    await db.carts.findById(params.carts_id).then( async cart => {
      if (cart) {
        cart.destroy().then(cart =>console.log(cart.data))
        response.message="susscces"
      }else{
        error = "carts not found"
      }
    });
    if(error){
      return res.send(new Errors.ServerError(error));
    }
    return res.send(response);
  },
  handleDeleteCart: async (req, res) => {
    const [err, params] = new Checkit({
      carts_id: ['integer', 'required'],
    }).validateSync(req.body);
    const isError = req.body.isError;
    if (isError || err) {
      return res.send(new Errors.ParamError(err));
    }
    const response = {}
    let error = null;
    await db.carts.findById(params.carts_id).then( async cart => {
      if (cart) {
        cart.destroy().then(cart =>console.log(cart.data))
        response.message="susscces"
      }else{
        error = "carts not found"
      }
    });
    if(error){
      return res.send(new Errors.ServerError(error));
    }
    return res.send(response);
  },
};
module.exports = CartController;
