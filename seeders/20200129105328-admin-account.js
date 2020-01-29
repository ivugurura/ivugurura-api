'use strict';

import { hashPassword } from '../helpers';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
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
    return queryInterface.bulkDelete('Users', null, {});
  }
};
