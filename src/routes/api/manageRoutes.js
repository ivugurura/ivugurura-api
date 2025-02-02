import { Router } from "express";
import { catchErrors, isAdmin, isMessageInfoValid } from "../../middlewares";
import {
  addToEntityDisplay,
  deleteFromEntityDisplay,
  getAllMessages,
  getChatUsers,
  getListenerMessages,
  searchInfo,
  sendContactUs,
} from "../../controllers/manageController";
import { getHomeContents } from "../../controllers/topicController";
import { isEntityDisplayValid } from "../../middlewares/topicMiddleware";

const manageRoutes = Router();
manageRoutes.get("/search", catchErrors(searchInfo));
manageRoutes.get("/home/contents", catchErrors(getHomeContents));
manageRoutes.post(
  "/contact-us",
  isMessageInfoValid,
  catchErrors(sendContactUs),
);
manageRoutes.get("/messages", catchErrors(getAllMessages));
manageRoutes.get(
  "/messages/:listenerId",
  catchErrors(isAdmin),
  catchErrors(getListenerMessages),
);
manageRoutes.get(
  "/chat-users",
  catchErrors(isAdmin),
  catchErrors(getChatUsers),
);
manageRoutes.patch(
  "/entity-display/:id",
  catchErrors(isAdmin),
  isEntityDisplayValid,
  catchErrors(addToEntityDisplay),
);
manageRoutes.delete(
  "/entity-display/:entityId",
  catchErrors(isAdmin),
  catchErrors(deleteFromEntityDisplay),
);

export default manageRoutes;
