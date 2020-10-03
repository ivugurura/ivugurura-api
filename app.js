import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import expressSession from 'express-session';
import userAgent from 'express-useragent';
import connectRedis from 'connect-redis';
import compression from 'compression';
import redis from 'redis';
import { capture } from 'express-device';
import { localPassport } from './config/passport';
import { sequelize } from './models';
import routes from './routes';
import { handleErrors } from './middlewares';
import { translate } from './locales';
import { security } from './config/security';
import { getLang } from './helpers';
import { appSocket } from './config/socketIo';

dotenv.config();
localPassport(passport);

const RedisStore = connectRedis(expressSession);
const redisClient = redis.createClient();

const redisSessionStore = new RedisStore({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  prefix: process.env.REDIS_PREFIX,
  name: process.env.REDIS_NAME,
  client: redisClient
});

const hour = 3600000;
const app = express();
const isProduction = process.env.NODE_ENV === 'production';
security(app);
app.use(cors({ origin: isProduction, credentials: true }));
app.use(capture());
app.use(userAgent.express());
app.set('trust proxy', true);

/**
 * Check database connection before running the app
 */
sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch(() => {
    console.log('Something wrong with db');
    process.exit(1);
  });
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 24 * hour },
    store: redisSessionStore
  })
);
/**
 * Initialize passport and session
 */
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  const lang = getLang(req);
  res.status(200).json({
    message: translate[lang].welcomeMesg
  });
});
/**
 * App routes
 */
app.use('/', routes);
/**
 * Configure socket
 */
appSocket(app);
/**
 * Catch unexpected errors
 */
app.use(handleErrors);

export default app;
