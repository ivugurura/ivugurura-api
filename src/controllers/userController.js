import passport from "passport";
import {
  serverResponse,
  QueryHelper,
  getPaginator,
  generatJWT,
  hashPassword,
  truncateString,
  getLang,
} from "../helpers";
import { Topic, Media, User, Sequelize, Commentary } from "../models";
import { ConstantHelper } from "../helpers/ConstantHelper";
import { convert } from "html-to-text";
import { translate } from "../locales";

const constants = new ConstantHelper();
const dbMedia = new QueryHelper(Media);
const dbTopic = new QueryHelper(Topic);
const userDb = new QueryHelper(User);
const commentDb = new QueryHelper(Commentary);
const { Op } = Sequelize;
export const userSignin = async (req, res, next) => {
  passport.authenticate("local.login", (error, user) => {
    if (error) return serverResponse(res, 401, error.message);
    req.logIn(user, (err) => {
      if (err) return next(err);

      user.token = generatJWT({ id: user.id });
      req.session.cookie.maxAge = constants.week;
      req.session.save();
      return serverResponse(res, 200, `Welcome ${user.names}`, user);
    });
  })(req, req, next);
};

export const logoutUser = (req, res, next) => {
  req.logout((error) => {
    if (error) return next(error);
    req.session.destroy();
    return serverResponse(res, 200, "Successfully logged out");
  });
};

export const getDashboardCounts = async (req, res) => {
  const lang = getLang(req);
  const { languageId } = req.body;
  let counts = {};
  const songs = await dbMedia.count({ languageId, type: "audio" });
  const videos = await dbMedia.count({ languageId, type: "video" });
  const users = await userDb.count({ role: { [Op.ne]: "1" } });
  const commentaries = await commentDb.count({});
  const published = await dbTopic.count({ languageId, isPublished: true });
  const unPublished = await dbTopic.count({ languageId, isPublished: false });
  counts = {
    [translate[lang].songs]: songs,
    [translate[lang].videos]: videos,
    [translate[lang].published]: published,
    [translate[lang].unPublished]: unPublished,
    [translate[lang].users]: users,
    [translate[lang].commentaries]: commentaries,
  };
  return serverResponse(res, 200, "Success", counts);
};

export const getTopicsByPublish = async (req, res) => {
  const { languageId } = req.body;
  const { truncate = 20, canTruncate = "no", search } = req.query;
  const paginator = getPaginator(req.query);
  let whereConditions = { languageId };
  const order = [
    ["isPublished", "ASC"],
    ["createdAt", "DESC"],
  ];
  if (search) {
    whereConditions = {
      ...whereConditions,
      title: { [Op.iLike]: `%${search}%` },
    };
  }
  let { count, rows } = await dbTopic.findAndCountAll({
    where: whereConditions,
    include: constants.topicIncludes(true),
    order,
    ...paginator,
  });
  const topics = rows
    .map((x) => x.get({ plain: true }))
    .map((topic) => {
      let content = topic.content;
      if (canTruncate === "yes") {
        content = truncateString(convert(topic.content), truncate);
      }
      return {
        ...topic,
        views: topic.views?.length || 0,
        content,
      };
    });

  return serverResponse(res, 200, "Success", topics, count);
};

export const createUser = async (req, res) => {
  req.body.password = hashPassword(req.body.password);
  req.body.role = 3;
  const newUser = await userDb.create(req.body);

  return serverResponse(res, 201, "Success", newUser);
};

export const updateUser = async (req, res) => {
  const { password } = req.body;
  const { userId: id } = req.params;
  if (password && password !== "") {
    req.body.password = hashPassword(password);
  }
  await userDb.update(req.body, { id });

  return serverResponse(res, 200, "Success");
};

export const getSystemUsers = async (req, res) => {
  const { offset, limit } = getPaginator(req.query);
  const attributes = { exclude: ["password", "previous_password"] };

  const { count, rows } = await userDb.findAndCountAll({
    where: { role: { [Op.ne]: "1" } },
    order: [["names", "ASC"]],
    attributes,
    offset,
    limit,
  });

  return serverResponse(res, 200, "Success", rows, count);
};

export const getMyProfile = async (req, res) => {
  return serverResponse(res, 200, "Success", req.user);
};

export const deleteUser = async (req, res) => {
  const { userId: id } = req.params;
  await userDb.delete({ id });

  return serverResponse(res, 200, "User has been deleted");
};
