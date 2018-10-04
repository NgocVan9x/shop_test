module.exports = {
  GET: {
    products: {
      lists: 'ProductController.getProducts',
    },
    carts: {
      listsByUser: 'CartController.handleGetCartsByUser',
    },
    order:{
      lists:'OrderController.handleGetOrders'
    }
  },
  POST: {
    users: {
      login: 'AccountController.login',
    },
    carts: {
      create: 'CartController.handleNewCart',
    }
  },
  PUT: {
    carts: {
      update: 'CartController.handleUpdateCart',
    }
  },
  DELETE: {
    carts: {
      deleteByUser: 'CartController.handleDeleteCart',
    }
  }
};
