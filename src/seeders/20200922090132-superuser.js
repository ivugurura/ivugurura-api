"use strict";

import { hashPassword } from "../helpers/util";
export const up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
    "users",
    [
      {
        names: "Super Admin User",
        username: "SuperAdmin",
        email: process.env.ADMIN_EMAIL,
        password: hashPassword(process.env.ADMIN_PWD),
        role: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  );
};
export const down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete("users", null, {});
};
