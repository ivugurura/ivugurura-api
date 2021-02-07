import {
	serverResponse,
	ValidatorHelper,
	joiValidatorMsg,
	getLang,
	QueryHelper
} from '../helpers';
import { User, Sequelize } from '../models';
import { translate } from '../locales';

const userDb = new QueryHelper(User);
const { Op } = Sequelize;
export const isLoginInfoValid = (req, res, next) => {
	if (req.isAuthenticated()) {
		const lang = getLang(req);
		const message = translate[lang].alreadyAuth;
		return serverResponse(res, 422, message);
	}
	let validator = new ValidatorHelper(req.body);
	const errorBody = validator.validateInput('login');
	if (errorBody.error) return joiValidatorMsg(res, errorBody);
	return next();
};
export const isUserInfoValid = async (req, res, next) => {
	const { userId } = req.params;
	let validator = new ValidatorHelper(req.body);
	let action = req.method === 'PATCH' ? 'edit' : 'add';
	const errorBody = validator.validateInput('user', action);
	if (errorBody.error) return joiValidatorMsg(res, errorBody);
	if (req.body.username.indexOf(' ') > 0) {
		return serverResponse(res, 400, 'Username should not have spaces');
	}

	const { email, username } = req.body;
	let conditions = { [Op.or]: [{ email }, { username }] };
	if (req.method === 'PATCH') {
		conditions = {
			[Op.and]: [
				{ id: { [Op.ne]: userId } },
				{ [Op.or]: [{ email }, { username }] }
			]
		};
	}
	const userExist = await userDb.findOne(conditions);
	if (!userExist) return next();
	return serverResponse(res, 400, 'User exists. Change username or password');
};
export const isMessageInfoValid = (req, res, next) => {
	let validator = new ValidatorHelper(req.body);
	const errorBody = validator.validateInput('message');
	if (errorBody.error) return joiValidatorMsg(res, errorBody);
	return next();
};
