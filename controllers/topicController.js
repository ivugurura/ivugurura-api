import { unlink } from 'fs';
import {
  QueryHelper,
  serverResponse,
  generateSlug,
  paginator,
} from '../helpers';
import { Topic, TopicView, Commentary } from '../models';
import { ConstantHelper } from '../helpers/ConstantHelper';

const dbHelper = new QueryHelper(Topic);
const dbCommentHelper = new QueryHelper(Commentary);
const constHelper = new ConstantHelper();
export const addNewTopic = async (req, res) => {
  req.body.userId = req.user.id;
  req.body.slug = generateSlug(req.body.title);
  const newTopic = await dbHelper.create(req.body);
  return serverResponse(res, 201, 'Created', newTopic);
};
export const getAllTopics = async (req, res) => {
  const { languageId } = req.body;
  const { category } = req.query;
  const { offset, limit } = paginator(req.query);
  let orderBy = [['createdAt', 'DESC']];
  let whereConditions = { languageId };
  if (category === 'carsoul') {
    orderBy = [['title', 'ASC']];
  }
  if (!isNaN(category)) {
    whereConditions = { languageId, categoryId: category };
  }
  const topics = await dbHelper.findAll(
    whereConditions,
    constHelper.topicIncludes(),
    orderBy,
    null,
    offset,
    limit
  );
  return serverResponse(res, 200, 'Success', topics);
};
export const getOneTopic = async (req, res) => {
  const viewDbHelper = new QueryHelper(TopicView);
  const { topicId: id } = req.params;
  const { languageId } = req.body;

  const topic = await dbHelper.findOne(
    { id, languageId },
    constHelper.oneTopicIncludes()
  );
  await viewDbHelper.findOrCreate({ topicId: id, ipAddress: req.ip });
  return serverResponse(res, 200, 'Success', topic);
};
export const editTopic = async (req, res) => {
  const { topicId: id } = req.params;
  if (req.body.title) {
    req.body.slug = generateSlug(req.body.title);
  }
  await dbHelper.update(req.body, { id });
  return serverResponse(res, 200, 'The topic updated');
};
export const deleteTopic = async (req, res) => {
  const { topicId: id } = req.params;
  const { coverImage } = req.body;
  const { IMAGES_ZONE } = process.env;
  await dbHelper.delete({ id });
  unlink(`${IMAGES_ZONE}/${coverImage}`, (error) => {
    if (error) console.log('File not delete');
    return serverResponse(res, 200, 'The topic deleted');
  });
};
export const addTopicComment = async (req, res) => {
  const { topicId } = req.params;
  req.body.topicId = topicId;

  const newComment = await dbCommentHelper.create(req.body);
  return serverResponse(res, 201, 'Success', newComment);
};
