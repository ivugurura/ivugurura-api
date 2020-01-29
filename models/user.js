'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      names: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING,
      previous_password: DataTypes.STRING,
      profile_image: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Topic, {
      foreignKey: 'topicId',
      as: 'topics'
    });
    User.hasMany(models.Commentary, {
      foreignKey: 'commentaryId',
      as: 'commentaries'
    });
    User.hasMany(models.Announcement, {
      foreignKey: 'announcementId',
      as: 'announcements'
    });
  };
  return User;
};
