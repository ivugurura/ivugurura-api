import { ValidatorHelper, joiValidatorMsg } from '../helpers';

export const isNewTopicValidated = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateNewTopic();
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
