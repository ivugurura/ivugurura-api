import { Router } from 'express';
import userRoutes from './userRoutes';
import topicRoutes from './topicRoutes';

const apiRoutes = Router();

apiRoutes.use('/user', userRoutes);
apiRoutes.use('/topic', topicRoutes);

export default apiRoutes;
