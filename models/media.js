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
      },
      languageId: {
        type: DataTypes.INTEGER,
        required: true
      },
      albumId: {
        type: DataTypes.INTEGER,
        required: true
      }
    },
    {}
  );
  Media.associate = function(models) {
    Media.belongsTo(models.Language);
    Media.belongsTo(models.Album);
  };
  return Media;
};
