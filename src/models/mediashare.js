"use strict";
module.exports = (sequelize, DataTypes) => {
  const MediaShare = sequelize.define(
    "MediaShare",
    {
      mediaId: {
        type: DataTypes.INTEGER,
        required: true,
      },
    },
    { tableName: "media_shares" },
  );
  MediaShare.associate = models => {
    MediaShare.belongsTo(models.Media, { foreignKey: "mediaId" });
  };
  return MediaShare;
};
