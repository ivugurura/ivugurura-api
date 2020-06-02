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
      coverImage: Joi.string(),
      content: Joi.string(),
      categoryId: Joi.number(),
      languageId: Joi.number().required(),
      isPublished: Joi.boolean(),
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
      coverImage: Joi.string().required(),
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
        attributes: ['id', 'name', 'slug'],
      },
    ];
  }
  oneTopicIncludes() {
    return [
      ...this.topicIncludes(),
      {
        model: Category,
        as: 'category',
        include: [
          {
            model: Topic,
            as: 'relatedTopics',
            attributes: ['title', 'slug', 'description'],
          },
        ],
      },
      {
        model: Commentary,
        as: 'commentaries',
        attributes: ['content'],
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
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    ];
  }
  commentKeys() {
    return {
      names: Joi.string().required(),
      email: Joi.string().email().required(),
      content: Joi.string().required(),
      website: Joi.string(),
      // coverImage: Joi.string(),
      languageId: Joi.number().required(),
    };
  }
}
