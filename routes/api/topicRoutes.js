import { Router } from 'express';
import { catchErrors, isAdminOrEditor } from '../../middlewares';
import { isNewTopicValidated } from '../../middlewares/topicMiddleware';
import { addNewTopic, getAllTopics } from '../../controllers/topicController';

const topicRoutes = Router();
topicRoutes.post(
  '/',
  isAdminOrEditor,
  isNewTopicValidated,
  catchErrors(addNewTopic)
);
topicRoutes.get('/', catchErrors(getAllTopics));

export default topicRoutes;
