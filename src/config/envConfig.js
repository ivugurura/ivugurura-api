import dotenv from "dotenv";

dotenv.config();

// query: { raw: true, nest: true }
const config = {
  port: process.env.PORT,
};
module.exports = {
  develop: {
    ...config,
  },
  staging: {
    ...config,
    port: process.env.PORT_STAGING,
  },
  test: {
    ...config,
  },
  production: {
    ...config,
  },
};
