import { Router } from 'express';
import userRoutes from './userRoutes';
import topicRoutes from './topicRoutes';
import categoryRoutes from './categoryRoutes';

const apiRoutes = Router();

apiRoutes.use('/user', userRoutes);
apiRoutes.use('/topic', topicRoutes);
apiRoutes.use('/category', categoryRoutes);

export default apiRoutes;
