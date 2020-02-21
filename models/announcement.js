'use strict';
module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define(
    'Announcement',
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      type: DataTypes.STRING,
      expiryDate: DataTypes.DATE
    },
    {}
  );
  Announcement.associate = function(models) {
    Announcement.belongsTo(models.User, {
      as: 'publisher',
      foreignKey: 'userId'
    });
    Announcement.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId'
    });
  };
  return Announcement;
};
