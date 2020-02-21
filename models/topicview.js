'use strict';
module.exports = (sequelize, DataTypes) => {
  const TopicView = sequelize.define(
    'TopicView',
    {
      ipAddress: DataTypes.STRING,
      topicId: {
        type: DataTypes.INTEGER,
        required: true
      }
    },
    {
      tableName: 'topic_views'
    }
  );
  TopicView.associate = models => {
    TopicView.belongsTo(models.Topic);
  };
  return TopicView;
};
