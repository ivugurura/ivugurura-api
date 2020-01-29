'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Languages',
      [
        {
          name: 'English',
          short_name: 'en',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'French',
          short_name: 'fr',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Languages', null, {});
  }
};
