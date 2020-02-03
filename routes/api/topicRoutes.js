import { Router } from 'express';
import { catchErrors, isAdminOrEditor } from '../../middlewares';
import {
  isNewTopicValidated,
  doesTopicExist,
  isExistingTopicValid
} from '../../middlewares/topicMiddleware';
import {
  addNewTopic,
  getAllTopics,
  editTopic,
  getOneTopic,
  deleteTopic
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
  catchErrors(doesTopicExist),
  catchErrors(deleteTopic)
);

export default topicRoutes;
