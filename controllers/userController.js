import passport from 'passport';
import {
  serverResponse,
  QueryHelper,
  paginator,
  generatJWT,
  hashPassword
} from '../helpers';
import { Topic, Media, User } from '../models';
import { ConstantHelper } from '../helpers/ConstantHelper';

const constants = new ConstantHelper();
const dbMedia = new QueryHelper(Media);
const dbTopic = new QueryHelper(Topic);
const userDb = new QueryHelper(User);
export const userSignin = async (req, res, next) => {
  passport.authenticate('local.login', (error, user) => {
    if (error) return serverResponse(res, 401, error.message);
    req.logIn(user, (err) => {
      if (err) return next(err);

      user.token = generatJWT({ id: user.id });
      req.session.cookie.maxAge = constants.week;
      req.session.save();
      return serverResponse(res, 200, `Welcome ${user.names}`, user);
    });
  })(req, req, next);
};
export const logoutUser = (req, res) => {
  req.session.destroy();
  req.logout();
  return serverResponse(res, 200, 'Successfully logged out');
};
export const getDashboardCounts = async (req, res) => {
  const { languageId } = req.body;
  let counts = {};
  const songs = await dbMedia.count({ type: 'audio' });
  const videos = await dbMedia.count({ type: 'video' });
  const published = await dbTopic.count({ languageId, isPublished: true });
  const unPublished = await dbTopic.count({ languageId, isPublished: false });
  counts = { songs, videos, published, unPublished };
  return serverResponse(res, 200, 'Success', counts);
};
export const getTopicsByPublish = async (req, res) => {
  const { languageId } = req.body;
  const { offset, limit } = paginator(req.query);
  const whereConditions = { languageId };
  const topics = await dbTopic.findAll(
    whereConditions,
    constants.topicIncludes(),
    [
      ['isPublished', 'ASC'],
      ['title', 'ASC']
    ],
    null,
    offset,
    limit
  );
  return serverResponse(res, 200, 'Success', topics);
};
export const createUser = async (req, res) => {
  req.body.password = hashPassword(req.body.password);
  req.body.role = 'editor';
  const newUser = await userDb.create(req.body);

  return serverResponse(res, 201, 'Success', newUser);
};
