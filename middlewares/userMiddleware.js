import { serverResponse, ValidatorHelper } from '../helpers';

export const isLoginInfoValid = (req, res, next) => {
  if (req.isAuthenticated()) {
    return serverResponse(res, 422, 'You are already authenticatred');
  }
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('user');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
