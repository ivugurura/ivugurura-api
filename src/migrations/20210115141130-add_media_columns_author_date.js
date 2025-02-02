"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all(
      [
        queryInterface.addColumn("media", "author", {
          type: Sequelize.STRING,
          allowNull: true,
        }),
      ],
      [
        queryInterface.addColumn("media", "actionDate", {
          type: Sequelize.DATE,
          allowNull: true,
        }),
      ],
    );
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("media", "author"),
      queryInterface.removeColumn("media", "actionDate"),
    ]);
  },
};
