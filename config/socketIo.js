import http from 'http';
import socketIo from 'socket.io';
import { ChatRoom, QueryHelper } from '../helpers';
import { Message } from '../models';

const port = process.env.PORT || 3000;
const chatRoom = new ChatRoom();
const messageDb = new QueryHelper(Message);
export const appSocket = (app) => {
  const server = http.createServer(app);
  const io = socketIo(server);

  io.on('connect', (socket) => {
    socket.on('join', ({ userId, name }, socketJoinCb) => {
      console.log('JOIN', userId, name);
      const newUser = chatRoom.addUser(socket.id, userId, name);

      socket.join(chatRoom.roomName);
      socket.emit('join-message', {
        senderName: 'Reformation Voice',
        content: `${newUser.name}, Welcome to Reformation voice`
      });
      socket.broadcast.to(chatRoom.roomName).emit('join-message', {
        senderName: 'Reformation Voice',
        content: `${newUser.name} has joined`
      });
      io.to(chatRoom.roomName).emit('users-list', {
        users: chatRoom.getRoomUsers()
      });
      console.log('JOINED user', chatRoom.getRoomUsers());
      socketJoinCb();
    });
    socket.on('send-message', ({ message }, sendMessageCb) => {
      const { userId, name } = chatRoom.userExist(socket.id);
      const newMessage = {
        senderId: userId,
        senderName: name,
        content: message
      };
      console.log('send message', newMessage);
      messageDb
        .create(newMessage)
        .then(() => {
          io.to(chatRoom.roomName).emit('new-message', {
            senderId: userId,
            senderName: name,
            content: message
          });
          sendMessageCb();
        })
        .catch(() => {
          socket.emit('send-message-error', { message: 'Message not sent' });
          sendMessageCb();
        });
    });
    socket.on('disconnect', () => {
      const user = chatRoom.removeUser(socket.id);
      if (user) {
        io.to(chatRoom.roomName).emit('users-list', {
          users: chatRoom.getRoomUsers()
        });
      }
    });
  });
  /**
   * Start express server
   */
  server.listen(port, () => console.log(`listening on port ${port}`));
};
