import dotenv from "dotenv";

dotenv.config();

// query: { raw: true, nest: true }
const queryOptions = {};
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    // dialectOptions: {
    //   charset: 'utf8mb4',
    //   collate: 'utf8mb4_unicode_ci'
    // },
    seederStorage: "sequelize",
    ...queryOptions,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      charset: "utf8mb4",
    },
    seederStorage: "sequelize",
    ...queryOptions,
  },
  production: {
    use_env_variable: "DATABASE_URL",
    ...queryOptions,
  },
};
