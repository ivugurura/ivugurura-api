'use strict';
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    'Media',
    {
      title: DataTypes.STRING,
      mediaLink: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM,
        values: ['audio', 'video', 'image']
      }
    },
    {}
  );
  Media.associate = function(models) {
    Media.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId'
    });
    Media.belongsTo(models.Album, {
      as: 'album',
      foreignKey: 'albumId'
    });
  };
  return Media;
};
