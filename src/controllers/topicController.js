import { unlink } from "fs";
import {
  QueryHelper,
  serverResponse,
  generateSlug,
  paginator,
  ucFirst,
  mailFormatter,
  sendEmail,
} from "../helpers";
import { Topic, TopicView, Commentary, sequelize } from "../models";
import { ConstantHelper } from "../helpers/ConstantHelper";
import { categoriesTopicQuery, topicViewsQuery } from "../helpers/rawQueries";

const dbHelper = new QueryHelper(Topic);
const dbCommentHelper = new QueryHelper(Commentary);
const constHelper = new ConstantHelper();

export const addNewTopic = async (req, res) => {
  req.body.userId = req.user.id;
  req.body.slug = generateSlug(req.body.title);
  req.body.title = ucFirst(req.body.title);
  const newTopic = await dbHelper.create(req.body);
  return serverResponse(res, 201, "Created", newTopic);
};

export const getAllTopics = async (req, res) => {
  const { languageId } = req.body;
  const { category } = req.query;
  const { offset, limit } = paginator(req.query);
  let orderBy = [["title", "ASC"]];
  let conditions = { languageId, isPublished: true };
  if (category === "carsoul") {
    orderBy = [["createdAt", "DESC"]];
  }
  if (!isNaN(category)) {
    conditions = { ...conditions, categoryId: category };
  }

  const { count, rows } = await dbHelper.findAndCountAll({
    where: conditions,
    include: constHelper.topicIncludes(),
    orderBy,
    offset,
    limit,
  });
  let topics = JSON.parse(JSON.stringify(rows));
  topics = topics.map((topic) => ({
    ...topic,
    views: topic.views.length || 0,
  }));

  return serverResponse(res, 200, "Success", topics, count);
};

export const getHomeContents = async (req, res) => {
  const { languageId } = req.body;
  let conditions = { languageId, isPublished: true };
  const offset = 0;
  const limit = 4;
  let recents = await dbHelper.findAll(
    conditions,
    constHelper.topicIncludes(),
    null,
    null,
    offset,
    limit
  );
  recents = JSON.parse(JSON.stringify(recents));
  recents = recents.map((topic) => ({
    ...topic,
    views: topic.views.length,
  }));
  const categories = await sequelize.query(categoriesTopicQuery(languageId), {
    type: sequelize.QueryTypes.SELECT,
    logging: false,
  });
  const mostReads = await sequelize.query(topicViewsQuery(languageId), {
    type: sequelize.QueryTypes.SELECT,
    logging: false,
  });
  const data = { recents, categories, mostReads };
  return serverResponse(res, 200, "Success", data);
};

export const getOneTopic = async (req, res) => {
  const viewDbHelper = new QueryHelper(TopicView);
  const { topicId: id } = req.params;
  const { languageId } = req.body;

  await viewDbHelper.create({ topicId: id, ipAddress: req.ip });
  const topic = await dbHelper.findOne(
    { id, languageId },
    constHelper.oneTopicIncludes()
  );
  return serverResponse(res, 200, "Success", topic);
};

export const editTopic = async (req, res) => {
  const { topicId: id } = req.params;
  const { title = "", originalTitle = "" } = req.body;
  if (title && title.toLowerCase() !== originalTitle.toLowerCase()) {
    req.body.slug = generateSlug(title);
    req.body.title = ucFirst(title);
  }

  await dbHelper.update(req.body, { id });
  return serverResponse(res, 200, "The topic updated");
};

export const deleteTopic = async (req, res) => {
  const { topicId: id } = req.params;
  const { coverImage } = req.body;
  const { IMAGES_ZONE } = process.env;
  await dbHelper.delete({ id });
  unlink(`${IMAGES_ZONE}/${coverImage}`, (error) => {
    if (error) console.log("File not delete");
    return serverResponse(res, 200, "The topic deleted");
  });
};

export const addTopicComment = async (req, res) => {
  const { topicId } = req.params;
  req.body.topicId = topicId;
  const { names, email, content } = req.body;

  const theTopic = await dbHelper.findOne({ id: topicId });

  let message = `${names} commented on <strong>${theTopic.title}</strong>.`;
  message += `<br><br><i><strong>${content}</strong></i>.`;
  message += `<br><br>Go to the dashboard in <strong>Commentaries</strong> section,`;
  message += `&nbsp;to take some actions on it.`;
  const subject = `New comment to ${theTopic.title}`;
  const emailContent = mailFormatter(names, email, message);

  const newComment = await dbCommentHelper.create(req.body);
  // Send message to Admin
  await sendEmail(subject, emailContent, process.env.CONTACT_EMAIL);

  return serverResponse(res, 201, "Success", newComment);
};

export const getTopicComments = async (req, res) => {
  const { topicId } = req.params;
  const attributes = ["names", "content", "createdAt"];
  const comments = await dbCommentHelper.findAll(
    { topicId, isPublished: true },
    null,
    null,
    attributes
  );
  return serverResponse(res, 200, "Success", comments);
};

export const getAllCommentaries = async (req, res) => {
  const { offset, limit } = paginator(req.query);
  const attributes = [
    "id",
    "names",
    "email",
    "website",
    "content",
    "isPublished",
    "createdAt",
  ];
  const orderBy = [
    ["isPublished", "ASC"],
    ["content", "ASC"],
  ];
  const { count, rows } = await dbCommentHelper.findAndCountAll({
    include: constHelper.commentIncludes(),
    orderBy,
    attributes,
    offset,
    limit,
  });

  return serverResponse(res, 200, "Success", rows, count);
};

export const publishComment = async (req, res) => {
  const { commentId: id } = req.params;
  const attributes = ["isPublished"];
  const { isPublished } = await dbCommentHelper.findOne(
    { id },
    null,
    attributes
  );

  await dbCommentHelper.update({ isPublished: !isPublished }, { id });
  return serverResponse(res, 200, "Published successfully");
};
