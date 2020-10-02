import {
  ValidatorHelper,
  joiValidatorMsg,
  QueryHelper,
  serverResponse
} from '../helpers';
import { Announcement } from '../models';

const dbHelper = new QueryHelper(Announcement);
export const isAnnouncemtValid = (req, res, next) => {
  const validator = new ValidatorHelper(req.body);
  const errorBody = validator.validateInput('announcemt');
  if (errorBody.error) return joiValidatorMsg(res, errorBody);
  return next();
};

export const doesAnnouncementExist = async (req, res, next) => {
  const { announcementId: id } = req.params;
  if (id) {
    const announcemt = await dbHelper.findOne({ id });
    if (announcemt) return next();
  }
  return serverResponse(res, 404, 'Announcement does not exist');
};
