import passport from 'passport';
import { serverResponse, QueryHelper, paginator } from '../helpers';
import { Topic, Media } from '../models';
import { ConstantHelper } from '../helpers/ConstantHelper';

const constants = new ConstantHelper();
const dbMedia = new QueryHelper(Media);
const dbTopic = new QueryHelper(Topic);
export const userSignin = async (req, res, next) => {
  passport.authenticate('local.login', (error, user) => {
    if (error) return serverResponse(res, 401, error.message);
    req.logIn(user, (err) => {
      if (err) return next(err);

      req.session.cookie.maxAge = constants.week;
      req.session.save();
      return serverResponse(res, 200, `Welcome ${user.names}`, user);
    });
  })(req, req, next);
};
export const getDashboardCounts = async (req, res) => {
  const { languageId } = req.body;
  let counts = {};
  const songs = await dbMedia.count({ languageId, type: 'audio' });
  const videos = await dbMedia.count({ languageId, type: 'video' });
  const published = await dbTopic.count({ languageId, isPublished: true });
  const unPublished = await dbTopic.count({ languageId, isPublished: null });
  counts = { songs, videos, published, unPublished };
  return serverResponse(res, 200, 'Success', counts);
};
export const getTopicsByPublish = async (req, res) => {
  const { languageId } = req.body;
  const { publishStatus } = req.params;
  const { offset, limit } = paginator(req.query);
  const isPublished = publishStatus === 'published' ? true : null;
  const whereConditions = { languageId, isPublished };
  const topics = await dbTopic.findAll(
    whereConditions,
    constants.topicIncludes(),
    [['title', 'ASC']],
    offset,
    limit
  );
  return serverResponse(res, 200, 'Success', topics);
};
