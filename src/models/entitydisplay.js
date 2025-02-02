"use strict";
module.exports = (sequelize, DataTypes) => {
  const EntityDisplay = sequelize.define(
    "EntityDisplay",
    {
      type: {
        type: DataTypes.ENUM,
        allowNull: true,
        values: ["topic", "media"],
      },
      displayType: {
        type: DataTypes.STRING,
      },
    },
    { tableName: "display_entities" },
  );
  EntityDisplay.associate = function (models) {
    EntityDisplay.belongsTo(models.Topic, {
      foreignKey: "entityId",
      as: "topic",
    });
    EntityDisplay.belongsTo(models.Media, {
      foreignKey: "entityId",
      as: "media",
    });
  };
  return EntityDisplay;
};
