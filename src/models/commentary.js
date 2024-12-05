"use strict";
module.exports = (sequelize, DataTypes) => {
  const Commentary = sequelize.define(
    "Commentary",
    {
      content: {
        type: DataTypes.TEXT,
        required: true,
      },
      isPublished: DataTypes.BOOLEAN,
      names: DataTypes.STRING,
      email: DataTypes.STRING,
      website: DataTypes.STRING,
      privateReply: DataTypes.TEXT,
    },
    { tableName: "commentaries" }
  );
  Commentary.associate = function (models) {
    Commentary.belongsTo(models.Topic, {
      as: "topic",
      foreignKey: "topicId",
    });
    Commentary.belongsTo(models.Commentary, {
      as: "parent",
      foreignKey: "parentId",
    });
    Commentary.hasMany(models.Commentary, {
      as: "replies",
      foreignKey: "parentId",
    });
  };
  return Commentary;
};
