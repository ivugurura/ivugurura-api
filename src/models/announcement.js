"use strict";
module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define(
    "Announcement",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      isPublished: DataTypes.BOOLEAN,
      expiryDate: DataTypes.DATE,
    },
    { tableName: "announcements" },
  );
  Announcement.associate = function (models) {
    Announcement.belongsTo(models.User, {
      as: "user",
      foreignKey: "userId",
    });
    Announcement.belongsTo(models.Language, {
      as: "language",
      foreignKey: "languageId",
    });
  };
  return Announcement;
};
