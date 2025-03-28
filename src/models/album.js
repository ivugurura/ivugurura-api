"use strict";
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    "Album",
    {
      name: DataTypes.STRING,
    },
    { tableName: "albums" },
  );
  Album.associate = function (models) {
    Album.hasMany(models.Media, {
      as: "album",
      foreignKey: "albumId",
    });
    Album.belongsTo(models.Language, {
      as: "language",
      foreignKey: "languageId",
    });
  };
  return Album;
};
