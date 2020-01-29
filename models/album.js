'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      name: DataTypes.STRING
    },
    {}
  );
  Album.associate = function(models) {
    Album.hasMany(models.Media, {
      foreignKey: 'mediaId',
      as: 'medias'
    });
  };
  return Album;
};
