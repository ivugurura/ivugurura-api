export class ChatRoom {
  constructor() {
    this.roomName = 'RRV_CHAT_ROOM';
    this.users = [];
  }
  userExist(id) {
    return this.users.find((user) => user.id === id);
  }
  addUser(id, name) {
    const newUser = { id, name, room: this.roomName };
    if (this.userExist(id)) return this.userExist;
    this.users.push(newUser);
    return newUser;
  }
  removeUser(id) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex !== -1) return users.splice(index, 1)[0];
  }
  getRoomUsers() {
    return this.users;
  }
}
