"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("topic_views", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ipAddress: {
        type: Sequelize.STRING,
      },
      topicId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "topics",
          key: "id",
          as: "topicId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("topic_views");
  },
};
