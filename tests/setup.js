import chai from "chai";
import { faker } from "@faker-js/faker";
import chaiAsPromise from "chai-as-promised";

chai.use(chaiAsPromise);

export const expect = chai.expect;

export const chatRoomUser = {
  socketId: faker.datatype.uuid(),
  userId: faker.datatype.uuid(),
  name: "test-user",
};
