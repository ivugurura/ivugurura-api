'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      senderId: DataTypes.STRING,
      senderName: DataTypes.STRING,
      content: DataTypes.TEXT,
      receiverId: DataTypes.STRING,
      fromAdmin: DataTypes.BOOLEAN
    },
    { tableName: 'messages' }
  );
  Message.associate = function (models) {
    // associations can be defined here
  };
  return Message;
};
