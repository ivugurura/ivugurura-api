import { Router } from 'express';
import { userSignin } from '../../controllers';
import { catchErrors } from '../../middlewares';

const userRoutes = Router();
userRoutes.get('/signin', catchErrors(userSignin));

export default userRoutes;
