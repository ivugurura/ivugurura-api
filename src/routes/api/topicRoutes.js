import { Router } from "express";
import {
  catchErrors,
  isAdmin,
  isAdminOrEditor,
  isTheOwner,
} from "../../middlewares";
import {
  isNewTopicValidated,
  doesTopicExist,
  isExistingTopicValid,
  isCommentValid,
  doesCommentExist,
} from "../../middlewares/topicMiddleware";
import {
  addNewTopic,
  getAllTopics,
  editTopic,
  getOneTopic,
  deleteTopic,
  addTopicComment,
  getTopicComments,
  getAllCommentaries,
  publishComment,
  deleteComments,
} from "../../controllers/topicController";

const topicRoutes = Router();
topicRoutes.post(
  "/",
  isAdminOrEditor,
  isNewTopicValidated,
  catchErrors(addNewTopic)
);
topicRoutes.get("/", catchErrors(getAllTopics));
topicRoutes.patch(
  "/:topicIdOrSlug",
  isAdminOrEditor,
  catchErrors(doesTopicExist),
  catchErrors(isTheOwner),
  isExistingTopicValid,
  catchErrors(editTopic)
);
topicRoutes.get(
  "/:topicIdOrSlug",
  catchErrors(doesTopicExist),
  catchErrors(getOneTopic)
);
topicRoutes.delete(
  "/:topicIdOrSlug",
  isAdminOrEditor,
  catchErrors(doesTopicExist),
  catchErrors(isTheOwner),
  catchErrors(deleteTopic)
);
topicRoutes.delete("/comments", isAdmin, catchErrors(deleteComments));
topicRoutes.post(
  "/:topicIdOrSlug/comments",
  isCommentValid,
  catchErrors(doesTopicExist),
  catchErrors(addTopicComment)
);
topicRoutes.get(
  "/:topicIdOrSlug/comments",
  catchErrors(doesTopicExist),
  catchErrors(getTopicComments)
);
topicRoutes.get(
  "/comments/all",
  isAdminOrEditor,
  catchErrors(getAllCommentaries)
);
topicRoutes.put(
  "/publish/comments/:commentId",
  isAdmin,
  catchErrors(doesCommentExist),
  catchErrors(publishComment)
);

export default topicRoutes;
