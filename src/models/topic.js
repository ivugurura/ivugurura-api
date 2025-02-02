"use strict";
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      title: DataTypes.STRING,
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      coverImage: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.TEXT,
      isPublished: DataTypes.BOOLEAN,
    },
    {
      tableName: "topics",
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
  );
  Topic.associate = models => {
    Topic.belongsTo(models.Language, {
      as: "language",
      foreignKey: "languageId",
    });
    Topic.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
    Topic.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Topic.hasMany(models.Commentary, {
      as: "commentaries",
      foreignKey: "topicId",
    });
    Topic.hasMany(models.TopicView, { as: "views", foreignKey: "topicId" });
    Topic.hasMany(models.Media, { as: "images", foreignKey: "topicId" });
    Topic.hasMany(models.EntityDisplay, {
      as: "entities",
      foreignKey: "entityId",
    });
  };
  return Topic;
};
