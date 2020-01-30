'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    'Topic',
    {
      title: DataTypes.STRING,
      slug: {
        type: DataTypes.STRING,
        unique: true
      },
      coverImage: DataTypes.STRING,
      description: DataTypes.STRING,
      content: DataTypes.TEXT,
      isPublished: DataTypes.BOOLEAN
    },
    {}
  );
  Topic.associate = models => {
    Topic.belongsTo(models.Language, {
      foreignKey: 'languageId',
      as: 'language',
      onDelete: 'CASCADE'
    });
    Topic.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'editor',
      onDelete: 'CASCADE'
    });
    Topic.hasMany(models.Commentary, {
      foreignKey: 'commentaryId',
      as: 'commentaries',
      onDelete: 'CASCADE'
    });
    Topic.hasMany(models.TopicView, {
      foreignKey: 'topicViewId',
      as: 'views',
      onDelete: 'CASCADE'
    });
    Topic.hasOne(models.Media, {
      foreignKey: 'mediaId',
      as: 'coverImage',
      onDelete: 'CASCADE'
    });
  };
  return Topic;
};
