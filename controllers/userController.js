import passport from 'passport';
import {
	serverResponse,
	QueryHelper,
	paginator,
	generatJWT,
	hashPassword
} from '../helpers';
import { Topic, Media, User, Sequelize, Commentary } from '../models';
import { ConstantHelper } from '../helpers/ConstantHelper';

const constants = new ConstantHelper();
const dbMedia = new QueryHelper(Media);
const dbTopic = new QueryHelper(Topic);
const userDb = new QueryHelper(User);
const commentDb = new QueryHelper(Commentary);
const { Op } = Sequelize;
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
	const users = await userDb.count({ role: { [Op.ne]: '1' } });
	const commentaries = await commentDb.count({});
	const published = await dbTopic.count({ languageId, isPublished: true });
	const unPublished = await dbTopic.count({ languageId, isPublished: false });
	counts = { songs, videos, published, unPublished, users, commentaries };
	return serverResponse(res, 200, 'Success', counts);
};
export const getTopicsByPublish = async (req, res) => {
	const { languageId } = req.body;
	const { offset, limit } = paginator(req.query);
	let whereConditions = { languageId };
	const orderBy = [
		['isPublished', 'ASC'],
		['createdAt', 'DESC']
	];
	if (req.query.search) {
		whereConditions = {
			...whereConditions,
			title: { [Op.iLike]: `%${req.query.search}%` }
		};
	}
	const topics = await dbTopic.findAll(
		whereConditions,
		constants.topicIncludes(),
		orderBy,
		null,
		offset,
		limit
	);

	const topicsCount = await dbTopic.count(whereConditions);

	return serverResponse(res, 200, 'Success', topics, topicsCount);
};
export const createUser = async (req, res) => {
	req.body.password = hashPassword(req.body.password);
	req.body.role = 3;
	const newUser = await userDb.create(req.body);

	return serverResponse(res, 201, 'Success', newUser);
};
export const updateUser = async (req, res) => {
	const { password } = req.body;
	const { userId: id } = req.params;
	if (password && password !== '') {
		req.body.password = hashPassword(password);
	}
	await userDb.update(req.body, { id });

	return serverResponse(res, 200, 'Success');
};
export const getSystemUsers = async (req, res) => {
	const { offset, limit } = paginator(req.query);
	const conditions = { role: { [Op.ne]: '1' } };
	const attributes = { exclude: ['password', 'previous_password'] };
	const orderBy = [['names', 'ASC']];

	const users = await userDb.findAll(
		conditions,
		null,
		orderBy,
		attributes,
		offset,
		limit
	);

	const usersCount = await userDb.count(conditions);

	return serverResponse(res, 200, 'Success', users, usersCount);
};
export const deleteUser = async (req, res) => {
	const { userId: id } = req.params;
	await userDb.delete({ id });

	return serverResponse(res, 200, 'User has been deleted');
};
