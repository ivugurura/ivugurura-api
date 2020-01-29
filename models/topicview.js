'use strict';
module.exports = (sequelize, DataTypes) => {
  const TopicView = sequelize.define(
    'TopicView',
    {
      isRead: DataTypes.BOOLEAN
    },
    {}
  );
  TopicView.associate = function(models) {
    TopicView.belongTo(models.Topic, {
      foreignKey: 'topicId',
      onDelete: 'CASCADE'
    });
    TopicView.belongTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return TopicView;
};
