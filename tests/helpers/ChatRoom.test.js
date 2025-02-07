import { ChatRoom } from "../../src/helpers/ChatRoom";
import { chatRoomUser, expect } from "../setup";

describe("Chat room helper", () => {
  let chatRoom;
  before(() => {
    chatRoom = new ChatRoom();
  });

  it("Should addNewUser", () => {
    const user = chatRoom.addUser(
      chatRoomUser.socketId,
      chatRoomUser.userId,
      chatRoomUser.name,
    );
    expect(user.id).equal(chatRoomUser.socketId);
  });
});
