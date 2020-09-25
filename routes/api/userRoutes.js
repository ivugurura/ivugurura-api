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
  isUserInfoValid
} from '../../middlewares';

const userRoutes = Router();
userRoutes.post(
  '/',
  isSuperAdmin,
  catchErrors(isUserInfoValid),
  catchErrors(createUser)
);
userRoutes.post('/login', isLoginInfoValid, catchErrors(userSignin));
userRoutes.get('/dashboard', isAdmin, catchErrors(getDashboardCounts));
userRoutes.get('/topics', isAdmin, catchErrors(getTopicsByPublish));
userRoutes.use('/logout', logoutUser);

export default userRoutes;
