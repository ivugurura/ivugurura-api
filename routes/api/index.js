import { Router } from 'express';
import userRoutes from './userRoutes';
import topicRoutes from './topicRoutes';
import categoryRoutes from './categoryRoutes';
import albumRoutes from './albumRoutes';
import announceRoutes from './announceRoutes';

const apiRoutes = Router();

apiRoutes.use('/user', userRoutes);
apiRoutes.use('/topic', topicRoutes);
apiRoutes.use('/category', categoryRoutes);
apiRoutes.use('/album', albumRoutes);
apiRoutes.use('/announcements', announceRoutes);

export default apiRoutes;
