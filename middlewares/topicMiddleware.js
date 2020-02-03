import {
  ValidatorHelper,
  joiValidatorMsg,
  QueryHelper,
  serverResponse
} from '../helpers';
import { Topic } from '../models';

export const isNewTopicValidated = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateNewTopic();
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};

export const doesTopicExist = async (req, res, next) => {
  const dbHelper = new QueryHelper(Topic);
  if (req.params.topicIdOrSlug) {
    const idOrSlug = req.params.topicIdOrSlug;
    const condition = isNaN(idOrSlug) ? { slug: idOrSlug } : { id: idOrSlug };
    const topic = await dbHelper.findOne(condition);
    if (topic) {
      req.params.topicId = topic.id;
      return next();
    }
  }
  return serverResponse(res, 404, 'Topic does not exist');
};
export const isExistingTopicValid = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateExistingTopic();
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
