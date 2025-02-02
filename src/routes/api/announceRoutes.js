import { Router } from "express";
import { catchErrors, doesAnnouncementExist, isAdmin } from "../../middlewares";
import {
  getAnnouncements,
  addNewAnnouncemt,
  editAnnouncemt,
  deleteAnnouncemt,
  getPublishedAnnouncemnt,
  publishAnnouncement,
} from "../../controllers/announceController";
import { isAnnouncemtValid } from "../../middlewares";

const announceRoutes = Router();

announceRoutes.get("/", catchErrors(getAnnouncements));
announceRoutes.get("/published", catchErrors(getPublishedAnnouncemnt));
announceRoutes.patch(
  "/:announcementId/publish",
  isAdmin,
  catchErrors(doesAnnouncementExist),
  catchErrors(publishAnnouncement),
);
announceRoutes.post(
  "/",
  isAdmin,
  isAnnouncemtValid,
  catchErrors(addNewAnnouncemt),
);
announceRoutes.patch(
  "/:announcementId",
  isAdmin,
  catchErrors(doesAnnouncementExist),
  isAnnouncemtValid,
  catchErrors(editAnnouncemt),
);
announceRoutes.delete(
  "/:announcementId",
  isAdmin,
  catchErrors(doesAnnouncementExist),
  catchErrors(deleteAnnouncemt),
);

export default announceRoutes;
