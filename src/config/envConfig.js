require("dotenv/config");

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
