import { Router } from 'express';
import userRoutes from './userRoutes';
import topicRoutes from './topicRoutes';
import categoryRoutes from './categoryRoutes';
import albumRoutes from './albumRoutes';
import announceRoutes from './announceRoutes';
import { catchErrors } from '../../middlewares';
import { searchInfo } from '../../controllers/manageController';

const apiRoutes = Router();

apiRoutes.use('/user', userRoutes);
apiRoutes.use('/topics', topicRoutes);
apiRoutes.use('/categories', categoryRoutes);
apiRoutes.use('/albums', albumRoutes);
apiRoutes.use('/announcements', announceRoutes);
apiRoutes.get('/search', catchErrors(searchInfo));

export default apiRoutes;
