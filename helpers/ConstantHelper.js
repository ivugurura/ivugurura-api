import Joi from 'joi';
import {
  Topic,
  Language,
  Category,
  User,
  Commentary,
  Media,
  TopicView,
} from '../models';

export class ConstantHelper {
  constructor() {
    this.hour = 3600000;
    this.day = this.hour * 24;
    this.week = this.day * 7;
  }
  static serverError = 'Unknown upload';
  getLoginKeys() {
    return {
      languageId: Joi.number().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    };
  }
  getSignupKeys() {
    let userInfo = {
      ...this.getLoginKeys(),
      names: Joi.string().required(),
      username: Joi.string().required(),
      access_lvl: Joi.number().required(),
    };
    return userInfo;
  }
  existingTopicKeys() {
    return {
      title: Joi.string(),
      description: Joi.string(),
      content: Joi.string(),
      isPublished: Joi.boolean(),
      mediaId: Joi.number(),
    };
  }
  categoryKeys() {
    return {
      name: Joi.string().required(),
      categoryId: Joi.number(),
      languageId: Joi.number(),
    };
  }
  albumKeys() {
    return {
      name: Joi.string().required(),
      languageId: Joi.number(),
    };
  }
  mediaKeys() {
    return {
      title: Joi.string().required(),
      type: Joi.string().valid('audio', 'video', 'image').required(),
      mediaLink: Joi.string().required(),
      languageId: Joi.number().required(),
      albumId: Joi.number().required(),
    };
  }
  announcemtKeys() {
    return {
      title: Joi.string().required(),
      type: Joi.string(),
      content: Joi.string().required(),
      expiryDate: Joi.date().required(),
      languageId: Joi.number().required(),
    };
  }
  getTopicKeys() {
    return {
      title: Joi.string().required(),
      description: Joi.string().required(),
      content: Joi.string().required(),
      isPublished: Joi.boolean(),
      categoryId: Joi.number().required(),
      mediaId: Joi.number(),
      languageId: Joi.number().required(),
    };
  }
  albumIncludes() {
    return [
      {
        model: Media,
        as: 'media',
        attributes: ['name'],
      },
    ];
  }
  announcementIncludes() {
    return [
      {
        model: User,
        as: 'user',
        attributes: ['names'],
      },
    ];
  }
  categoryIncludes() {
    return [
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
      },
    ];
  }
  oneTopicIncludes() {
    return [
      ...this.topicIncludes(),
      {
        model: Category,
        as: 'category',
        include: [{ model: Topic, as: 'relatedTopics' }],
      },
      {
        model: TopicView,
        as: 'views',
        attributes: ['ipAddress'],
      },
    ];
  }
  topicIncludes() {
    return [
      ...this.announcementIncludes(),
      {
        model: Language,
        as: 'language',
        attributes: ['name'],
      },
      {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
      {
        model: Commentary,
        as: 'commentaries',
        attributes: ['content'],
      },
    ];
  }
}
