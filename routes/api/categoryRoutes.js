import { Router } from 'express';
import {
  catchErrors,
  isAdminOrEditor,
  isCategoryValid,
  doesCategoryExist,
} from '../../middlewares';
import {
  getCategories,
  createNewCategory,
  editCategory,
  deleteCategory,
  getNavCategories,
  getACategory,
} from '../../controllers/categoryController';

const categoryRoutes = Router();

categoryRoutes.get('/', catchErrors(getCategories));
categoryRoutes.get('/navs', catchErrors(getNavCategories));

categoryRoutes.post(
  '/',
  isAdminOrEditor,
  catchErrors(doesCategoryExist),
  isCategoryValid,
  catchErrors(createNewCategory)
);
categoryRoutes.get(
  '/:categoryId',
  catchErrors(doesCategoryExist),
  catchErrors(getACategory)
);
categoryRoutes.patch(
  '/:categoryId',
  isAdminOrEditor,
  catchErrors(doesCategoryExist),
  isCategoryValid,
  catchErrors(editCategory)
);
categoryRoutes.delete(
  '/:categoryId',
  isAdminOrEditor,
  catchErrors(doesCategoryExist),
  catchErrors(deleteCategory)
);

export default categoryRoutes;
