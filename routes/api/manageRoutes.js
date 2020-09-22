import { Router } from 'express';
import { catchErrors, isMessageInfoValid } from '../../middlewares';
import { searchInfo, sendContactUs } from '../../controllers/manageController';

const manageRoutes = Router();
manageRoutes.get('/search', catchErrors(searchInfo));
manageRoutes.post(
  '/contact-us',
  isMessageInfoValid,
  catchErrors(sendContactUs)
);

export default manageRoutes;
