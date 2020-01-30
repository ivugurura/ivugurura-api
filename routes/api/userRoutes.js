import { Router } from 'express';
import { userSignin } from '../../controllers/userController';
import { catchErrors, isLoginInfoValid } from '../../middlewares';

const userRoutes = Router();
userRoutes.post('/login', isLoginInfoValid, catchErrors(userSignin));

export default userRoutes;
