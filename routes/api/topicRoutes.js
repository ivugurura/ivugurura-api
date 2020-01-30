import { Router } from 'express';
import { catchErrors, isAdminOrEditor } from '../../middlewares';

const topicRoutes = Router();
topicRoutes.post('/', isAdminOrEditor);

export default topicRoutes;
