import { serverResponse, QueryHelper } from '../helpers';
import { Category } from '../models';
import { ConstantHelper } from '../helpers/ConstantHelper';

const dbHelper = new QueryHelper(Category);
const constHelper = new ConstantHelper();
export const createNewCategory = async (req, res) => {
  let newCategory = await dbHelper.create(req.body);
  return serverResponse(res, 201, 'Category created', newCategory);
};

export const getCategories = async (req, res) => {
  const { languageId } = req.params;
  const categories = await dbHelper.findAll(
    { languageId },
    constHelper.categoryIncludes()
  );
  return serverResponse(res, 201, 'Success', categories);
};

export const editCategory = async (req, res) => {
  const { categoryId: id } = req.params;
  await dbHelper.update(req.body, { id });
  return serverResponse(res, 200, 'The category updated');
};

export const deleteCategory = async (req, res) => {
  const { categoryId: id } = req.params;
  await dbHelper.delete({ id });
  return serverResponse(res, 200, 'The category deleted');
};
