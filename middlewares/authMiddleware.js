import { serverResponse, authenticatedUser, getLang } from '../helpers';
import { translate } from '../locales';

export const isAuthenticated = async (req, res, next) => {
  const user = await authenticatedUser(req);
  if (user) return next();

  const lang = getLang(req);
  const message = translate[lang].notAuth;
  return serverResponse(res, 401, message);
};

export const isEditor = async (req, res, next) => {
  const user = await authenticatedUser(req);
  if (user && user.role === 'editor') {
    return next();
  }
  const lang = getLang(req);
  const message = translate[lang].notEditor;

  return serverResponse(res, 401, message);
};

export const isAdmin = async (req, res, next) => {
  const user = await authenticatedUser(req);
  if (user && user.role === 'admin') {
    return next();
  }

  const lang = getLang(req);
  const message = translate[lang].notAdmin;

  return serverResponse(res, 401, message);
};

export const isAdminOrEditor = async (req, res, next) => {
  const user = await authenticatedUser(req);
  if (user) {
    if (user.role === 'editor' || user.role === 'admin') return next();
  }
  const lang = getLang(req);
  const message = translate[lang].notAdmin;

  return serverResponse(res, 401, message);
};

export const isSuperAdmin = async (req, res, next) => {
  const user = await authenticatedUser(req);
  if (user && user.email === process.env.ADMIN_EMAIL) return next();
  return serverResponse(res, 401, 'You are not allowed to set up menu');
};
