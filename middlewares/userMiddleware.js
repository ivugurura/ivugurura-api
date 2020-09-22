import {
  serverResponse,
  ValidatorHelper,
  joiValidatorMsg,
  getLang
} from '../helpers';
import { translate } from '../locales';

export const isLoginInfoValid = (req, res, next) => {
  if (req.isAuthenticated()) {
    const lang = getLang(req);
    const message = translate[lang].alreadyAuth;
    return serverResponse(res, 422, message);
  }
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('user');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
export const isMessageInfoValid = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('message');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
