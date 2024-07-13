import {
  serverResponse,
  authenticatedUser,
  getLang,
  QueryHelper,
  systemRoles,
} from "../helpers";
import { translate } from "../locales";
import { Topic } from "../models";

const topicDb = new QueryHelper(Topic);
export const isAuthenticated = async (req, res, next) => {
  const user = await authenticatedUser(req);
  req.user = user;
  if (user) return next();

  const lang = getLang(req);
  const message = translate[lang].notAuth;
  return serverResponse(res, 401, message);
};

export const isEditor = async (req, res, next) => {
  const user = await authenticatedUser(req);
  if (user && user.role === systemRoles.editor) {
    req.user = user;
    return next();
  }
  const lang = getLang(req);
  const message = translate[lang].notEditor;

  return serverResponse(res, 401, message);
};

export const isAdmin = async (req, res, next) => {
  const user = await authenticatedUser(req);
  if (user && user.role <= systemRoles.admin) {
    req.user = user;
    return next();
  }

  const lang = getLang(req);
  const message = translate[lang].notAdmin;

  return serverResponse(res, 401, message);
};

export const isAdminOrEditor = async (req, res, next) => {
  const user = await authenticatedUser(req);
  req.user = user;
  if (user && user.role <= systemRoles.editor) return next();
  const lang = getLang(req);
  const message = translate[lang].notAdmin;

  return serverResponse(res, 401, message);
};
export const isTheOwner = async (req, res, next) => {
  const user = await authenticatedUser(req);
  req.user = user;
  const { topicId: id } = req.params;
  const topic = await topicDb.findOne({ id, userId: user.id });
  if (topic) return next();
  if (user.role <= systemRoles.admin) {
    return next();
  }
  return serverResponse(res, 403, "You are not allowed");
};
export const isSuperAdmin = async (req, res, next) => {
  const user = await authenticatedUser(req);
  req.user = user;
  if (user && user.email === process.env.ADMIN_EMAIL) return next();
  return serverResponse(res, 401, "You are not allowed to perform action");
};
