import { Category, Sequelize } from '../models';
import { ConstantHelper } from '../helpers/ConstantHelper';
import { serverResponse, QueryHelper, generateSlug } from '../helpers';

const dbHelper = new QueryHelper(Category);
const constHelper = new ConstantHelper();
const { Op } = Sequelize;
export const createNewCategory = async (req, res) => {
  req.body.slug = generateSlug(req.body.name);
  let newCategory = await dbHelper.create(req.body);
  return serverResponse(res, 201, 'Category created', newCategory);
};

export const getNavCategories = async (req, res) => {
  const { languageId } = req.body;
  const orderByName = [['name', 'ASC']];
  const categories = await dbHelper.findAll(
    { languageId, categoryId: null },
    constHelper.categoryIncludes(),
    orderByName
  );
  return serverResponse(res, 201, 'Success', categories);
};

export const getCategories = async (req, res) => {
  const { languageId } = req.body;
  const orderByName = [['name', 'ASC']];
  const categories = await dbHelper.findAll(
    { languageId, categoryId: { [Op.not]: null } },
    null,
    orderByName
  );
  return serverResponse(res, 201, 'Success', categories);
};

export const editCategory = async (req, res) => {
  const { categoryId: id } = req.params;
  if (req.body.name) {
    req.body.slug = generateSlug(req.body.name);
  }
  await dbHelper.update(req.body, { id });
  return serverResponse(res, 200, 'The category updated');
};

export const deleteCategory = async (req, res) => {
  const { categoryId: id } = req.params;
  await dbHelper.delete({ id });
  return serverResponse(res, 200, 'The category deleted');
};
