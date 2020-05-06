import { QueryHelper, serverResponse, generateSlug } from '../helpers';
import { Topic, TopicView } from '../models';
import { ConstantHelper } from '../helpers/ConstantHelper';

const dbHelper = new QueryHelper(Topic);
const constHelper = new ConstantHelper();
export const addNewTopic = async (req, res) => {
  req.body.userId = req.user.id;
  req.body.slug = generateSlug(req.body.title);
  const newTopic = await dbHelper.create(req.body);
  return serverResponse(res, 201, 'Created', newTopic);
};
export const getAllTopics = async (req, res) => {
  const { languageId } = req.body;
  const { page, pageSize } = req.query;
  const offset = (page - 1) * pageSize || 0;
  const limit = pageSize || 20;
  console.log(`Offset:${offset},Limit:${limit}`);
  const topics = await dbHelper.findAll(
    { languageId },
    constHelper.topicIncludes(),
    null,
    Number(offset),
    Number(limit)
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
  await dbHelper.delete({ id });
  return serverResponse(res, 200, 'The topic deleted');
};
