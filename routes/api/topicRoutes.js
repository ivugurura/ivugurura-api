import { Router } from 'express';
import { catchErrors, isAdminOrEditor } from '../../middlewares';
import {
  isNewTopicValidated,
  doesTopicExist,
  isExistingTopicValid,
  isCommentValid,
} from '../../middlewares/topicMiddleware';
import {
  addNewTopic,
  getAllTopics,
  editTopic,
  getOneTopic,
  deleteTopic,
  addTopicComment,
  getTopicComments,
  getAllCommentaries,
} from '../../controllers/topicController';

const topicRoutes = Router();
topicRoutes.post(
  '/',
  isAdminOrEditor,
  isNewTopicValidated,
  catchErrors(addNewTopic)
);
topicRoutes.get('/', catchErrors(getAllTopics));
topicRoutes.patch(
  '/:topicIdOrSlug',
  isAdminOrEditor,
  catchErrors(doesTopicExist),
  isExistingTopicValid,
  catchErrors(editTopic)
);
topicRoutes.get(
  '/:topicIdOrSlug',
  catchErrors(doesTopicExist),
  catchErrors(getOneTopic)
);
topicRoutes.delete(
  '/:topicIdOrSlug',
  isAdminOrEditor,
  catchErrors(doesTopicExist),
  catchErrors(deleteTopic)
);
topicRoutes.post(
  '/:topicIdOrSlug/comments',
  isCommentValid,
  catchErrors(doesTopicExist),
  catchErrors(addTopicComment)
);
topicRoutes.get(
  '/:topicIdOrSlug/comments',
  catchErrors(doesTopicExist),
  catchErrors(getTopicComments)
);
topicRoutes.get(
  '/comments/all',
  isAdminOrEditor,
  catchErrors(getAllCommentaries)
);

export default topicRoutes;
