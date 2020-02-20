'use strict';

const hashPassword = require('../helpers/util').hashPassword;
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          names: 'Reformation Voice',
          username: 'Reformation',
          email: 'reformation@email.com',
          password: hashPassword('MyPassword'),
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
