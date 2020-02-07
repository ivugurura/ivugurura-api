import { Router } from 'express';
import userRoutes from './userRoutes';
import topicRoutes from './topicRoutes';
import categoryRoutes from './categoryRoutes';
import albumRoutes from './albumRoutes';

const apiRoutes = Router();

apiRoutes.use('/user', userRoutes);
apiRoutes.use('/topic', topicRoutes);
apiRoutes.use('/category', categoryRoutes);
apiRoutes.use('/album', albumRoutes);

export default apiRoutes;
