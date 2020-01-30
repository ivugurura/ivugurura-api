import Joi from 'joi';

export class ConstantHelper {
  constructor() {
    this.login = {
      email: Joi.string().required(),
      password: Joi.string().required()
    };
    this.topic = {
      title: Joi.string().required(),
      description: Joi.string().required(),
      content: Joi.string().required(),
      is_published: Joi.boolean()
    };
    this.hour = 3600000;
    this.day = this.hour * 24;
    this.week = this.day * 7;
  }
  getLoginKeys() {
    return this.login;
  }
  getSignupKeys() {
    let userInfo = {
      ...this.login,
      names: Joi.string().required(),
      username: Joi.string().required(),
      access_lvl: Joi.number().required()
    };
    return userInfo;
  }
  getTopicKeys() {
    return this.topic;
  }
}
