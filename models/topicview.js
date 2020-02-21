'use strict';
module.exports = (sequelize, DataTypes) => {
  const TopicView = sequelize.define(
    'TopicView',
    {
      isRead: DataTypes.BOOLEAN,
      topicId: {
        type: DataTypes.INTEGER,
        required: true
      },
      userId: DataTypes.INTEGER
    },
    {
      tableName: 'topic_views'
    }
  );
  TopicView.associate = models => {
    TopicView.belongsTo(models.Topic);
    TopicView.belongsTo(models.User);
  };
  return TopicView;
};
