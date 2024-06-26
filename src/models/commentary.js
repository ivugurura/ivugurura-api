'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentary = sequelize.define(
    'Commentary',
    {
      content: {
        type: DataTypes.TEXT,
        required: true,
      },
      isPublished: DataTypes.BOOLEAN,
      names: DataTypes.STRING,
      email: DataTypes.STRING,
      website: DataTypes.STRING,
    },
    { tableName: 'commentaries' }
  );
  Commentary.associate = function (models) {
    Commentary.belongsTo(models.Topic, {
      as: 'topic',
      foreignKey: 'topicId',
    });
  };
  return Commentary;
};
