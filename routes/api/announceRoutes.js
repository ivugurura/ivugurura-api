import { Router } from 'express';
import {
  catchErrors,
  isAdminOrEditor,
  doesAnnouncementExist
} from '../../middlewares';
import {
  getAnnouncements,
  addNewAnnouncemt,
  editAnnouncemt,
  deleteAnnouncemt
} from '../../controllers/announceController';
import { isAnnouncemtValid } from '../../middlewares';

const announceRoutes = Router();

announceRoutes.get('/', catchErrors(getAnnouncements));
announceRoutes.post(
  '/',
  isAdminOrEditor,
  isAnnouncemtValid,
  catchErrors(addNewAnnouncemt)
);
announceRoutes.patch(
  '/:announcementId',
  isAdminOrEditor,
  catchErrors(doesAnnouncementExist),
  isAnnouncemtValid,
  catchErrors(editAnnouncemt)
);
announceRoutes.delete(
  '/:announcementId',
  isAdminOrEditor,
  catchErrors(doesAnnouncementExist),
  catchErrors(deleteAnnouncemt)
);

export default announceRoutes;
