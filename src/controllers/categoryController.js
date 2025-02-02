import { Category, Sequelize, sequelize } from "../models";
import { ConstantHelper } from "../helpers/ConstantHelper";
import { serverResponse, QueryHelper, generateSlug } from "../helpers";
import { categoriesTopicQuery } from "../helpers/rawQueries";

const dbHelper = new QueryHelper(Category);
const constHelper = new ConstantHelper();
const { Op } = Sequelize;
export const createNewCategory = async (req, res) => {
  req.body.slug = generateSlug(req.body.name);
  let newCategory = await dbHelper.create(req.body);
  return serverResponse(res, 201, "Category created", newCategory);
};

export const getNavCategories = async (req, res) => {
  const { languageId } = req.body;
  const categories = await dbHelper.findAll(
    { languageId, categoryId: null },
    constHelper.categoryIncludes(),
  );
  return serverResponse(res, 200, "Success", categories);
};

export const getCategories = async (req, res) => {
  const { languageId } = req.body;
  const { categoryType } = req.query;
  let db = dbHelper;
  let categories = null;
  if (categoryType === "with-topics") {
    categories = await sequelize.query(categoriesTopicQuery(languageId), {
      type: sequelize.QueryTypes.SELECT,
      logging: false,
    });
  } else {
    const orderByName = [["name", "ASC"]];
    categories = await db.findAll(
      { languageId, categoryId: { [Op.not]: null } },
      null,
      orderByName,
    );
  }
  return serverResponse(res, 200, "Success", categories);
};
export const getACategory = async (req, res) => {
  const { languageId, categoryId: id } = req.body;
  const attributes = ["id", "name", "slug", "createdAt"];
  const category = await dbHelper.findOne(
    { languageId, id },
    constHelper.oneCategoryIncludes(),
    attributes,
  );
  return serverResponse(res, 200, "Success", category);
};
export const editCategory = async (req, res) => {
  const { categoryId: id } = req.params;
  if (req.body.name) {
    req.body.slug = generateSlug(req.body.name);
  }
  await dbHelper.update(req.body, { id });
  return serverResponse(res, 200, "The category updated");
};

export const deleteCategory = async (req, res) => {
  const { categoryId: id } = req.params;
  await dbHelper.delete({ id });
  return serverResponse(res, 200, "The category deleted");
};
