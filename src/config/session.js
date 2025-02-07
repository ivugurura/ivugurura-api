import expressSession from "express-session";
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import { ConstantHelper } from "../helpers/ConstantHelper";

const constants = new ConstantHelper();
const redisClient = createClient();

redisClient
  .connect()
  .then(() => console.log("Redis connected"))
  .catch(error => {
    process.stdout.write(`Redis error: ${error.message}\n`);
    process.exit(1);
  });

const redisSessionStore = new RedisStore({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  prefix: process.env.REDIS_PREFIX,
  name: process.env.REDIS_NAME,
  pass: process.env.REDIS_SECRET,
  client: redisClient,
});

export const session = () =>
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.BASE_URL,
      path: "/",
      sameSite: true,
      maxAge: 24 * constants.hour,
    },
    store: redisSessionStore,
  });
