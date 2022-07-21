import { Category, Topic, Message, Sequelize } from "../models";
import {
  QueryHelper,
  serverResponse,
  sendEmail,
  authenticatedUser,
  mailFormatter,
  paginator,
  axiosYouTube,
} from "../helpers";

const categoryDb = new QueryHelper(Category);
const topicDb = new QueryHelper(Topic);
const messageDb = new QueryHelper(Message);
const { Op } = Sequelize;

/**
 * @param {*} req Express request
 * @param {*} res Express response
 */
export const searchInfo = async (req, res) => {
  const { languageId } = req.body;
  const { searchKey } = req.query;
  const condition = {
    [Op.iLike]: `%${searchKey}%`,
  };
  const topicConditions = {
    languageId,
    isPublished: true,
    title: condition,
  };
  const categoryConditions = {
    categoryId: { [Op.not]: null },
    languageId,
    name: condition,
  };
  const topics = await topicDb.findAll(
    topicConditions,
    null,
    [["title", "ASC"]],
    ["id", "title", "slug", "description"]
  );
  const categories = await categoryDb.findAll(
    categoryConditions,
    null,
    [["name", "ASC"]],
    ["id", "name", "slug"]
  );
  const searched = { topics, categories };
  return serverResponse(res, 200, "Success", searched);
};
export const sendContactUs = async (req, res) => {
  const { names, email, message } = req.body;

  const subject = `${names} contacted us from ${process.env.APP_NAME}`;
  const emailContent = mailFormatter(names, email, message);

  await sendEmail(subject, emailContent, process.env.CONTACT_EMAIL);

  return serverResponse(res, 200, "Message sent");
};
export const getAllMessages = async (req, res) => {
  const user = await authenticatedUser(req);
  const { listenerId } = req.query;
  let conditions = null;
  if (listenerId && listenerId !== "all") {
    conditions = {
      [Op.or]: {
        senderId: listenerId,
        receiverId: listenerId,
        fromAdmin: true,
      },
    };
  } else if (user && listenerId === "all") {
    conditions = null;
  } else {
    conditions = { fromAdmin: true };
  }
  const messages = await messageDb.findAll(conditions);

  return serverResponse(res, 200, "Success", messages);
};
export const getListenerMessages = async (req, res) => {
  const { listenerId } = req.params;
  const messages = await messageDb.findAll({
    senderId: listenerId,
    receiverId: listenerId,
  });
  return serverResponse(res, 200, "Success", messages);
};
export const getChatUsers = async (req, res) => {
  const attributes = ["senderId", "senderName"];
  const group = ["senderId", "senderName"];
  const { offset, limit } = paginator(req.query);
  const users = await messageDb.findAll(
    null,
    null,
    null,
    attributes,
    offset,
    limit,
    group
  );

  return serverResponse(res, 200, "Success", users);
};

export const getYoutubeVideos = async (req, res) => {
  const { searchKey, pageSize, pageToken } = req.query;
  const { data } = await axiosYouTube.get("/search", {
    params: {
      q: searchKey,
      type: "video",
      channelId: "UCCzVYqdLwgNMLMsP-NKNnIQ",
      maxResults: pageSize || 5,
      order: "date",
      pageToken,
    },
  });
  return serverResponse(res, 200, "Success", data);
};
