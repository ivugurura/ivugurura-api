'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentary = sequelize.define(
    'Commentary',
    {
      content: DataTypes.TEXT,
      topicId: {
        type: DataTypes.INTEGER,
        required: true
      }
    },
    {}
  );
  Commentary.associate = function(models) {
    Commentary.belongsTo(models.User);
    Commentary.belongsTo(models.Topic);
  };
  return Commentary;
};
