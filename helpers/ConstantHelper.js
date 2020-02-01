import Joi from 'joi';

export class ConstantHelper {
  constructor() {
    this.hour = 3600000;
    this.day = this.hour * 24;
    this.week = this.day * 7;
  }
  getLoginKeys() {
    return {
      email: Joi.string().required(),
      password: Joi.string().required()
    };
  }
  getSignupKeys() {
    let userInfo = {
      ...this.getLoginKeys(),
      names: Joi.string().required(),
      username: Joi.string().required(),
      access_lvl: Joi.number().required()
    };
    return userInfo;
  }
  getTopicKeys() {
    return {
      title: Joi.string().required(),
      description: Joi.string().required(),
      content: Joi.string().required(),
      isPublished: Joi.boolean(),
      categoryId: Joi.number().required(),
      mediaId: Joi.number(),
      languageId: Joi.number().required()
    };
  }
}
