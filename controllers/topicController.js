import { QueryHelper, serverResponse, generateSlug } from '../helpers';
import { Topic, Language, Category, User, Commentary } from '../models';

const dbHelper = new QueryHelper(Topic);
export const addNewTopic = async (req, res) => {
  req.body.userId = req.user.id;
  req.body.slug = generateSlug(req.body.title);
  const newTopic = await dbHelper.create(req.body);
  return serverResponse(res, 201, 'Created', newTopic);
};
export const getAllTopics = async (req, res) => {
  const topics = await dbHelper.findAll(null, [
    {
      model: Language,
      as: 'language',
      attributes: ['name']
    },
    {
      model: Category,
      as: 'category',
      attributes: ['name']
    },
    {
      model: User,
      as: 'editor',
      attributes: ['names']
    },
    {
      model: Commentary,
      as: 'commentaries',
      attributes: ['content']
    }
  ]);
  return serverResponse(res, 200, 'Success', topics);
};
