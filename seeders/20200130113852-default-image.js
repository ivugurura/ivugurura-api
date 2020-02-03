'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Media',
      [
        {
          title: 'English',
          mediaLink: 'en',
          type: 'image',
          albumId: 1,
          languageId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Media', null, {});
  }
};
