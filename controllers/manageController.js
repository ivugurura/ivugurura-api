import { Category, Topic, Message, Sequelize } from '../models';
import {
	QueryHelper,
	serverResponse,
	sendEmail,
	authenticatedUser
} from '../helpers';

const categoryDb = new QueryHelper(Category);
const topicDb = new QueryHelper(Topic);
const messageDb = new QueryHelper(Message);
const { Op } = Sequelize;

/**
 * @param {*} req Express request
 * @param {*} res Express response
 */
export const searchInfo = async (req, res) => {
	const { languageId } = req.body;
	const { searchKey } = req.query;
	const condition = {
		[Op.iLike]: `%${searchKey}%`
	};
	const topicConditions = {
		languageId,
		isPublished: true,
		title: condition
	};
	const categoryConditions = {
		categoryId: { [Op.not]: null },
		languageId,
		name: condition
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

	return serverResponse(res, 200, 'Message sent');
};
export const getAllMessages = async (req, res) => {
	const user = await authenticatedUser(req);
	const { listenerId } = req.query;
	let conditions = null;
	if (listenerId && listenerId !== 'all') {
		conditions = {
			[Op.or]: { senderId: listenerId, receiverId: listenerId, fromAdmin: true }
		};
	} else if (user && listenerId === 'all') {
		conditions = null;
	} else {
		conditions = { fromAdmin: true };
	}
	const messages = await messageDb.findAll(conditions);

	return serverResponse(res, 200, 'Success', messages);
};
export const getListenerMessages = async (req, res) => {
	const { listenerId } = req.params;
	const messages = await messageDb.findAll({
		senderId: listenerId,
		receiverId: listenerId
	});
	return serverResponse(res, 200, 'Success', messages);
};
