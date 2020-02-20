'use strict';
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define(
    'Language',
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      short_name: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {}
  );
  Language.associate = models => {};
  return Language;
};
