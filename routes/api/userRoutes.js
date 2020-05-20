import { Router } from 'express';
import {
  userSignin,
  getDashboardCounts,
  getTopicsByPublish,
} from '../../controllers/userController';
import { catchErrors, isLoginInfoValid, isAdmin } from '../../middlewares';
import { isTopicStatusValid } from '../../middlewares/topicMiddleware';

const userRoutes = Router();
userRoutes.post('/login', isLoginInfoValid, catchErrors(userSignin));
userRoutes.get('/dashboard', isAdmin, catchErrors(getDashboardCounts));
userRoutes.get(
  '/topics/:publishStatus',
  isAdmin,
  isTopicStatusValid,
  catchErrors(getTopicsByPublish)
);

export default userRoutes;
