import { Router } from 'express';
import {
  monitorDevActions,
  route404,
  setLanguage,
  catchErrors
} from '../middlewares';
import apiRoutes from './api';

const routes = Router();

routes.use(monitorDevActions);
routes.use('/socket.io', catchErrors(setLanguage), apiRoutes);
routes.all('*', route404);

export default routes;
