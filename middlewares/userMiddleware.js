import { serverResponse, ValidatorHelper, joiValidatorMsg } from '../helpers';
import { translate } from '../locales';

export const isLoginInfoValid = (req, res, next) => {
  if (req.isAuthenticated()) {
    const headerLang = req.acceptsLanguages('en', 'fr', 'kn') || 'kn';
    const message = translate[headerLang].alreadyAuth;
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
