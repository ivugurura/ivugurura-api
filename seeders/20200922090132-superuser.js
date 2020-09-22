'use strict';

import { hashPassword } from '../helpers/util';
export const up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
    'users',
    [
      {
        names: 'Super Admin User',
        username: 'SuperAdim',
        email: process.env.ADMIN_EMAIL,
        password: hashPassword(process.env.ADMIN_PWD),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  );
};
export const down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('users', null, {});
};
