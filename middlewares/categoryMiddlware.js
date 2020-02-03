import {
  ValidatorHelper,
  joiValidatorMsg,
  QueryHelper,
  serverResponse
} from '../helpers';
import { Category } from '../models';

export const isCategoryValid = async (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateCategory();
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};

export const doesCategoryExist = async (req, res, next) => {
  let dbHelper = new QueryHelper(Category);
  if (req.params.categoryId) {
    const { categoryId: id } = req.params;
    const category = await dbHelper.findOne({ id });
    if (category) return next();
  }
  return serverResponse(res, 404, 'Category does not exist');
};
