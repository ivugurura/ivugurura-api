'use strict';
module.exports = (sequelize, DataTypes) => {
  const TopicView = sequelize.define(
    'TopicView',
    {
      isRead: DataTypes.BOOLEAN
    },
    {}
  );
  TopicView.associate = models => {
    TopicView.belongsTo(models.Topic, {
      foreignKey: 'topicId',
      onDelete: 'CASCADE'
    });
    TopicView.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return TopicView;
};
