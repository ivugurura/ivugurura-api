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
  const { names, email, message } = req.body;

  const html = `<strong>${message}</strong>`;
  const subject = `${names} contacted us from ${process.env.APP_NAME}`;
  const messageContent = {
    to: process.env.CONTACT_EMAIL,
    from: process.env.APP_EMAIL,
    subject,
    html,
    text: message
  };
  const sentMsg = await sendEmail(messageContent);
  console.log('Sent message reuslt', sentMsg);

  return serverResponse(res, 200, 'Message sent');
};
