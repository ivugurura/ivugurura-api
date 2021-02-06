import { Router } from 'express';
import {
	userSignin,
	getDashboardCounts,
	getTopicsByPublish,
	logoutUser,
	createUser,
	getSystemUsers
} from '../../controllers/userController';
import {
	catchErrors,
	isLoginInfoValid,
	isSuperAdmin,
	isUserInfoValid,
	isAdminOrEditor,
	isAdmin
} from '../../middlewares';

const userRoutes = Router();
userRoutes.post(
	'/',
	isSuperAdmin,
	catchErrors(isUserInfoValid),
	catchErrors(createUser)
);
userRoutes.get('/', isAdmin, catchErrors(getSystemUsers));
userRoutes.post('/login', isLoginInfoValid, catchErrors(userSignin));
userRoutes.get('/dashboard', isAdminOrEditor, catchErrors(getDashboardCounts));
userRoutes.get('/topics', isAdminOrEditor, catchErrors(getTopicsByPublish));
userRoutes.use('/logout', logoutUser);

export default userRoutes;
