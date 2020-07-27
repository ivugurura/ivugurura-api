import { Router } from 'express';
import { catchErrors } from '../../middlewares';
import { searchInfo, sendContactUs } from '../../controllers/manageController';

const manageRoutes = Router();
manageRoutes.get('/search', catchErrors(searchInfo));
manageRoutes.post('/contact-us', catchErrors(sendContactUs));

export default manageRoutes;
