"use strict";
const { registerType } = require("pgvector/sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    registerType(Sequelize);

    await queryInterface.sequelize.query(
      "CREATE EXTENSION IF NOT EXISTS vector;",
    );

    await queryInterface.createTable("topic_chunks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      chunkIndex: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      embedding: {
        type: Sequelize.DataTypes.VECTOR(384),
        allowNull: false,
      },
      topicUpdatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      topicId: {
        type: Sequelize.INTEGER,
        references: {
          model: "topics",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      languageId: {
        type: Sequelize.INTEGER,
        references: {
          model: "languages",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
  async down(queryInterface) {
    await queryInterface.dropTable("topic_chunks");
  },
};
