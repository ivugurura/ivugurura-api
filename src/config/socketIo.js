import { Server } from "socket.io";
// import http from 'http';
import { ChatRoom, QueryHelper } from "../helpers";
import { Message } from "../models";
import cfg from "../config/envConfig";

const env = process.env.NODE_ENV || "develop";
const envVars = cfg[env];

const port = envVars.port;
const chatRoom = new ChatRoom();
const messageDb = new QueryHelper(Message);
/**
 *
 * @param {Express} app
 */
export const appSocket = (app) => {
  // const server = http.createServer(app);
  /**
   * Start express server
   */
  const server = app.listen(port, () =>
    console.log(`listening on port ${port}`)
  );
  const io = new Server(server, {
    allowEIO3: true,
  });

  io.on("connect", (socket) => {
    socket.on("join", ({ userId, name }, socketJoinCb) => {
      const newUser = chatRoom.addUser(socket.id, userId, name);

      socket.join(chatRoom.roomName);
      socket.emit("join-message", {
        senderId: userId,
        senderName: "Reformation Voice",
        content: `${newUser.name}, Welcome to Reformation voice`,
      });
      socket.broadcast.to(chatRoom.roomName).emit("join-message", {
        senderId: userId,
        senderName: "Reformation Voice",
        content: `${newUser.name} has joined`,
      });
      io.to(chatRoom.roomName).emit("users-list", {
        users: chatRoom.getRoomUsers(),
      });
      socketJoinCb();
    });
    socket.on(
      "send-message",
      ({ message, receiverId, fromAdmin }, sendMessageCb) => {
        const user = chatRoom.userExist(socket.id);
        if (user) {
          const { userId, name } = user;
          const newMessage = {
            senderId: userId,
            senderName: name,
            content: message,
            receiverId,
            fromAdmin,
          };
          messageDb
            .create(newMessage)
            .then(() => {
              io.to(chatRoom.roomName).emit("new-message", {
                senderId: userId,
                senderName: name,
                content: message,
                receiverId,
                fromAdmin,
              });
              sendMessageCb();
            })
            .catch(() => {
              socket.emit("send-message-error", {
                message: "Message not sent",
              });
              sendMessageCb();
            });
        } else {
          socket.emit("send-message-error", {
            message: "Message not sent. Reflesh the page and try again",
          });
          sendMessageCb();
        }
      }
    );
    socket.on("disconnect", () => {
      const user = chatRoom.removeUser(socket.id);
      if (user) {
        io.to(chatRoom.roomName).emit("users-list", {
          users: chatRoom.getRoomUsers(),
        });
      }
    });
  });
};
