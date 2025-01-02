import {
  ValidatorHelper,
  joiValidatorMsg,
  QueryHelper,
  serverResponse,
} from "../helpers";
import { Topic, Commentary } from "../models";

export const isNewTopicValidated = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput("newTopic");
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};

export const doesTopicExist = async (req, res, next) => {
  const dbHelper = new QueryHelper(Topic);
  if (req.params.topicIdOrSlug) {
    const key = isNaN(req.params.topicIdOrSlug) ? "slug" : "id";
    const topic = await dbHelper.findOne({ [key]: idOrSlug });
    if (topic) {
      req.params.topicId = topic.id;
      req.body.originalTitle = topic.title || undefined;
      return next();
    }
  }
  console.log(req.body, req.params);
  return serverResponse(res, 404, "Topic does not exist");
};
export const isExistingTopicValid = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput("existingTopic");
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
export const isTopicStatusValid = (req, res, next) => {
  const { publishStatus } = req.params;
  const valids = ["published", "unPublished"];
  if (publishStatus && valids.includes(publishStatus)) {
    return next();
  }
  return serverResponse(res, 400, "Unknown routes");
};
export const isCommentValid = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput("comment");
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
export const doesCommentExist = async (req, res, next) => {
  const dbCommentHelper = new QueryHelper(Commentary);
  const { commentId } = req.params;
  if (commentId) {
    const comment = await dbCommentHelper.findOne({ id: commentId }, null, [
      "id",
    ]);
    if (comment) return next();
  }
  return serverResponse(res, 404, "Commentary does not exist");
};
export const isEntityDisplayValid = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput("entity-display");
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
export const isCommentReplyValidated = (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput("commentReply");
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};
