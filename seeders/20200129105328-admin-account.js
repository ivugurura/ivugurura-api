'use strict';

import { hashPassword } from '../helpers/util';
export const up = (queryInterface, Sequelize) => {
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
        updatedAt: new Date(),
      },
    ],
    {}
  );
};
export const down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('users', null, {});
};
