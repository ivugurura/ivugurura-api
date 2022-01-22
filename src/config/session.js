import expressSession from "express-session";
import connectRedis from "connect-redis";
import { createClient } from "redis";
import { ConstantHelper } from "../helpers/ConstantHelper";

const constants = new ConstantHelper();
const RedisStore = connectRedis(expressSession);
const redisClient = createClient({ legacyMode: true });

redisClient
  .connect()
  .then(() => console.log("Redis connected"))
  .catch((error) => {
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
      secure: process.env.NODE_ENV === "production",
      domain: process.env.BASE_URL,
      path: "/",
      sameSite: true,
      maxAge: 24 * constants.hour,
    },
    store: redisSessionStore,
  });
