import { Router } from 'express';
import {
  userSignin,
  getDashboardCounts,
  getTopicsByPublish,
  logoutUser,
  createUser
} from '../../controllers/userController';
import {
  catchErrors,
  isLoginInfoValid,
  isAdmin,
  isSuperAdmin,
  isUserInfoValid,
  isAdminOrEditor
} from '../../middlewares';

const userRoutes = Router();
userRoutes.post(
  '/',
  isSuperAdmin,
  catchErrors(isUserInfoValid),
  catchErrors(createUser)
);
userRoutes.post('/login', isLoginInfoValid, catchErrors(userSignin));
userRoutes.get('/dashboard', isAdminOrEditor, catchErrors(getDashboardCounts));
userRoutes.get('/topics', isAdminOrEditor, catchErrors(getTopicsByPublish));
userRoutes.use('/logout', logoutUser);

export default userRoutes;
