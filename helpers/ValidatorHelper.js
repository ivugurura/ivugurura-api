import Joi from 'joi';
import { ConstantHelper } from './ConstantHelper';

export class ValidatorHelper extends ConstantHelper {
  constructor(data) {
    super();
    this.data = data;
  }

  validateUser() {
    return Joi.validate(this.data, Joi.object().keys(this.getLoginKeys()));
  }
  validateNewTopic() {
    return Joi.validate(this.data, Joi.object().keys(this.getTopicKeys()));
  }
}
