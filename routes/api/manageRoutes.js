import { Router } from 'express';
import { catchErrors, isAdmin, isMessageInfoValid } from '../../middlewares';
import {
  getAllMessages,
  getListenerMessages,
  searchInfo,
  sendContactUs
} from '../../controllers/manageController';

const manageRoutes = Router();
manageRoutes.get('/search', catchErrors(searchInfo));
manageRoutes.post(
  '/contact-us',
  isMessageInfoValid,
  catchErrors(sendContactUs)
);
manageRoutes.get('/messages', catchErrors(getAllMessages));
manageRoutes.get(
  '/messages/:listenerId',
  catchErrors(isAdmin),
  catchErrors(getListenerMessages)
);

export default manageRoutes;
