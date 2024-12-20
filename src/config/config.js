import dotenv from "dotenv";

dotenv.config();

// query: { raw: true, nest: true }
const queryOptions = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  seederStorage: "sequelize",
};
module.exports = {
  development: queryOptions,
  test: {
    ...queryOptions,
    database: process.env.DB_TEST_NAME,
  },
  production: {
    use_env_variable: "DATABASE_URL",
  },
};
