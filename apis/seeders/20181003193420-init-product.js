'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [{
      name: 'camera 19',
      desctiption: 'camera 19',
      price: 10,
  },
  {
      name: 'iphone x',
      desctiption: 'iphone x',
      price: 101
  },
  {
      name: 'iphone xs',
      desctiption: 'iphone xs',
      price: 150
  },
  {
      name: 'iphone 6',
      desctiption: 'iphone 6',
      price: 20
  },
  {
      name: 'iphone 5',
      desctiption: 'iphone 5',
      price: 10
  },
  {
      name: 'iphone 5s',
      desctiption: 'iphone 5s',
      price: 13
  },
  {
      name: 'samsung s5',
      desctiption: 'samsung s5',
      price: 103
  },
  {
      name: 'samsung s6',
      desctiption: 'samsung s6',
      price: 104
  },
  {
      name: 'samsung s7',
      desctiption: 'samsung s7',
      price: 109
  }]);
  },

  down: (queryInterface, Sequelize) => {
  }
};
