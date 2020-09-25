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
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('user');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);

  const { email, username } = req.body;
  const conditions = { email };
  const userExist = await userDb.findOne(conditions);

  if (!userExist) return next();
  return serverResponse(res, 400, 'User exists');
};
export const isMessageInfoValid = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('message');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
