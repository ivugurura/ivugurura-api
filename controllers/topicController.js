import { QueryHelper, serverResponse, generateSlug } from '../helpers';
import { Topic } from '../models';
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
  const topics = await dbHelper.findAll(null);
  return serverResponse(res, 200, 'Success', topics);
};
export const getOneTopic = async (req, res) => {
  const { topicId: id } = req.params;
  const topic = await dbHelper.findOne({ id }, constHelper.oneTopicIncludes());
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
