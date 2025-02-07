"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable("display_entities", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        type: {
          type: Sequelize.ENUM,
          allowNull: false,
          values: ["topic", "media"],
        },
        displayType: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        entityId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: "CASCADE",
          references: {
            model: "topics",
            key: "id",
            as: "entityId",
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
      })
      .catch(error => {
        console.log(error);
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("display_entities");
  },
};
