import {
  ValidatorHelper,
  joiValidatorMsg,
  QueryHelper,
  serverResponse,
} from '../helpers';
import { Category } from '../models';

export const isCategoryValid = async (req, res, next) => {
  let validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('category');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};

export const doesCategoryExist = async (req, res, next) => {
  let dbHelper = new QueryHelper(Category);
  const categoryId = req.params.categoryId || req.body.categoryId;
  if (categoryId) {
    const category = await dbHelper.findOne({ id: categoryId });
    if (category) return next();
  }
  if (req.method === 'POST' && !categoryId) return next();
  return serverResponse(res, 404, 'Category does not exist');
};
