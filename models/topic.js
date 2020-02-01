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
      description: DataTypes.STRING,
      content: DataTypes.TEXT,
      isPublished: DataTypes.BOOLEAN
    },
    {}
  );
  Topic.associate = models => {
    Topic.belongsTo(models.Language, {
      as: 'language',
      foreignKey: 'languageId'
    });
    Topic.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'category'
    });
    Topic.belongsTo(models.User, { foreignKey: 'userId', as: 'editor' });
    Topic.hasMany(models.Commentary, { as: 'commentaries' });
    Topic.hasMany(models.TopicView, { as: 'views' });
    Topic.hasOne(models.Media, { as: 'coverImage' });
  };
  return Topic;
};
