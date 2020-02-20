import { Router } from 'express';
import {
  catchErrors,
  isAdminOrEditor,
  isCategoryValid,
  doesCategoryExist
} from '../../middlewares';
import {
  getCategories,
  createNewCategory,
  editCategory,
  deleteCategory
} from '../../controllers/categoryController';

const categoryRoutes = Router();
categoryRoutes.get('/', catchErrors(getCategories));
categoryRoutes.post(
  '/',
  isAdminOrEditor,
  isCategoryValid,
  catchErrors(createNewCategory)
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
