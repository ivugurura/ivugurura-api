import { serverResponse, QueryHelper } from '../helpers';
import db, { Announcement } from '../models';

const dbHelper = new QueryHelper(Announcement);
export const getAnnouncements = async (req, res) => {
  const { languageId } = req.body;
  const announcements = await dbHelper.findAll({ languageId });
  return serverResponse(res, 200, 'Success', announcements);
};
export const getPublishedAnnouncemnt = async (req, res) => {
  const { languageId } = req.body;
  const attributes = ['id', 'title', 'content'];
  const announcement = await dbHelper.findOne(
    { languageId, isPublished: true },
    null,
    attributes
  );
  return serverResponse(res, 200, 'Success', announcement);
};
export const publishAnnouncement = async (req, res) => {
  const { announcementId: id } = req.params;
  const { languageId, isPublished } = req.body;
  /**
   * First unpublish all then
   * Publish according to the ID
   */
  await dbHelper.update({ isPublished: false }, { languageId });
  await dbHelper.update({ isPublished: !isPublished }, { id });
  return serverResponse(res, 200, 'Success');
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
