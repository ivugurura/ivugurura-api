import { Router } from 'express';
import userRoutes from './userRoutes';

const apiRoutes = Router();

apiRoutes.use('/user', userRoutes);

export default apiRoutes;
