'use strict';
module.exports = (sequelize, DataTypes) => {
  const Commentary = sequelize.define(
    'Commentary',
    {
      content: DataTypes.TEXT
    },
    {}
  );
  Commentary.associate = function(models) {
    Commentary.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'commentor',
      onDelete: 'CASCADE'
    });
    Commentary.belongsTo(models.Topic, {
      foreignKey: 'topicId',
      as: 'topic',
      onDelete: 'CASCADE'
    });
  };
  return Commentary;
};
