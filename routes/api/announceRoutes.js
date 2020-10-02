import { Router } from 'express';
import {
  catchErrors,
  isAdminOrEditor,
  doesAnnouncementExist,
} from '../../middlewares';
import {
  getAnnouncements,
  addNewAnnouncemt,
  editAnnouncemt,
  deleteAnnouncemt,
  getPublishedAnnouncemnt,
  publishAnnouncement,
} from '../../controllers/announceController';
import { isAnnouncemtValid } from '../../middlewares';

const announceRoutes = Router();

announceRoutes.get('/', catchErrors(getAnnouncements));
announceRoutes.get('/published', catchErrors(getPublishedAnnouncemnt));
announceRoutes.patch(
  '/:announcementId/publish',
  isAdminOrEditor,
  catchErrors(doesAnnouncementExist),
  catchErrors(publishAnnouncement)
);
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
