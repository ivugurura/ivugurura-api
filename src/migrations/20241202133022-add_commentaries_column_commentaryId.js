"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("commentaries", "parentId", {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        references: {
          model: "categories",
          key: "id",
          as: "parent",
        },
      }),
      queryInterface.addColumn("commentaries", "privateReply", {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("commentaries", "parentId"),
      queryInterface.removeColumn("commentaries", "privateReply"),
    ]);
  },
};
