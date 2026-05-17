"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TopicChunk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Topic, {
        as: "topic",
        foreignKey: "topicId",
      });
      this.belongsTo(models.Language, {
        as: "language",
        foreignKey: "languageId",
      });
    }
  }
  TopicChunk.init(
    {
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      chunkIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      embedding: {
        type: DataTypes.VECTOR(384),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "TopicChunk",
      tableName: "topic_chunks",
    },
  );
  return TopicChunk;
};
