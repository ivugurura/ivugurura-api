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
  const categoryIdOrSlug = req.params.categoryId || req.body.categoryId;
  if (categoryIdOrSlug) {
    const attribute = isNaN(categoryIdOrSlug) ? 'slug' : 'id';
    const category = await dbHelper.findOne({ [attribute]: categoryIdOrSlug });
    if (category) {
      req.params.categoryId = category.id;
      req.body.categoryId = category.id;
      return next();
    }
  }
  if (req.method === 'POST' && !categoryId) return next();
  return serverResponse(res, 404, 'Category does not exist');
};
