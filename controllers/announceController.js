import { serverResponse, QueryHelper } from '../helpers';
import { Announcement } from '../models';

const dbHelper = new QueryHelper(Announcement);
export const getAnnouncements = async (req, res) => {
  const { languageId } = req.body;
  const announcements = await dbHelper.findAll({ languageId });
  return serverResponse(res, 200, 'Success', announcements);
};
export const addNewAnnouncemt = async (req, res) => {
  req.body.userId = req.user.id;
  const newAnnouncemt = await dbHelper.create(req.body);
  return serverResponse(res, 200, 'Success', newAnnouncemt);
};

export const editAnnouncemt = async (req, res) => {
  const { announcementId: id } = req.params;
  await dbHelper.update(req.body, { id });
  return serverResponse(res, 200, 'The Announcement updated');
};
export const deleteAnnouncemt = async (req, res) => {
  const { announcementId: id } = req.params;
  await dbHelper.delete({ id });
  return serverResponse(res, 200, 'The Announcement deleted');
};
