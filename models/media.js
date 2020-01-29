'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    'Media',
    {
      title: DataTypes.STRING,
      mediaLink: DataTypes.STRING,
      type: DataTypes.ENUM('audio', 'video', 'image')
    },
    {}
  );
  Media.associate = function(models) {
    Media.hasOne(models.Language, {
      foreignKey: 'language_id',
      as: 'language'
    });
    Media.belongsTo(models.Album, {
      foreignKey: 'albumId',
      as: 'album',
      onDelete: 'CASCADE'
    });
  };
  return Media;
};
