import { Router } from 'express';
import {
  userSignin,
  getDashboardCounts,
  getTopicsByPublish
} from '../../controllers/userController';
import { catchErrors, isLoginInfoValid, isAdmin } from '../../middlewares';

const userRoutes = Router();
userRoutes.post('/login', isLoginInfoValid, catchErrors(userSignin));
userRoutes.get('/dashboard', isAdmin, catchErrors(getDashboardCounts));
userRoutes.get('/topics', isAdmin, catchErrors(getTopicsByPublish));

export default userRoutes;
