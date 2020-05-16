import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import expressSession from 'express-session';
import connectRedis from 'connect-redis';
import redis from 'redis';
import { capture } from 'express-device';
import { localPassport } from './config/passport';
import { sequelize } from './models';
import routes from './routes';
import { handleErrors } from './middlewares';
import { translate } from './locales';

dotenv.config();
localPassport(passport);

const RedisStore = connectRedis(expressSession);
const redisClient = redis.createClient();

const redisSessionStore = new RedisStore({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  prefix: process.env.REDIS_PREFIX,
  name: process.env.REDIS_NAME,
  client: redisClient,
});

const port = process.env.PORT || 3000;
const hour = 3600000;
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(capture());
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
app.use('/songs', express.static('public/songs'));
app.use('/images', express.static('public/images'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    name: process.env.SESSION_NAME,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 24 * hour },
    store: redisSessionStore,
  })
);
/**
 * Initialize passport and session
 */
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  const headerLang = req.acceptsLanguages('en', 'fr', 'kn') || 'kn';
  res.status(200).json({
    message: translate[headerLang].welcomeMesg,
  });
});
/**
 * App routes
 */
app.use('/', routes);
/**
 * Catch unexpected errors
 */
app.use(handleErrors);
/**
 * Start express server
 */
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;
