import Joi from 'joi';
import { ConstantHelper } from './ConstantHelper';

export class ValidatorHelper extends ConstantHelper {
  constructor(reqBody) {
    this.reqBody = reqBody;
  }

  validateUser() {
    loginSchema = Joi.object().keys(this.getLoginKeys);
    return Joi.validate(this.reqBody, loginSchema);
  }
}
