import { Category, Topic, Sequelize } from '../models';
import { QueryHelper, serverResponse, sendEmail } from '../helpers';

const categoryDb = new QueryHelper(Category);
const topicDb = new QueryHelper(Topic);
const { Op } = Sequelize;

/**
 * @param {*} req Express request
 * @param {*} res Express response
 */
export const searchInfo = async (req, res) => {
  const { languageId } = req.body;
  const condition = {
    [Op.substring]: req.query.searchKey
  };
  const topicConditions = {
    [Op.or]: [
      {
        title: condition,
        description: condition
      }
    ],
    languageId,
    isPublished: true
  };
  const categoryConditions = {
    name: condition,
    categoryId: { [Op.not]: null },
    languageId
  };
  const topics = await topicDb.findAll(
    topicConditions,
    null,
    [['title', 'ASC']],
    ['id', 'title', 'slug', 'description']
  );
  const categories = await categoryDb.findAll(
    categoryConditions,
    null,
    [['name', 'ASC']],
    ['id', 'name', 'slug']
  );
  const searched = { topics, categories };
  return serverResponse(res, 200, 'Success', searched);
};
export const sendContactUs = async (req, res) => {
  const sentMsg = await sendEmail(req.body);
  console.log('Sent message reuslt', sentMsg);

  return serverResponse(res, 200, 'Message sent');
};
