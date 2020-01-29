import { Router } from 'express';
import { monitorDevActions, route404 } from '../middlewares';
import apiRoutes from './api';

const routes = Router();

routes.use(monitorDevActions);
routes.use('/api', apiRoutes);
routes.all('*', route404);

export default routes;
