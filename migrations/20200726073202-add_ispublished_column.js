'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('commentaries', 'isPublished', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('commentaries', 'isPublished'),
};
