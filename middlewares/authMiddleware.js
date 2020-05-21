import { serverResponse, authenticatedUser } from '../helpers';
import { translate } from '../locales';

export const isAuthenticated = async (req, res, next) => {
  const user = await authenticatedUser(req);
  if (user) return next();

  const headerLang = req.acceptsLanguages('en', 'fr', 'kn') || 'kn';
  const message = translate[headerLang].notAuth;
  return serverResponse(res, 401, message);
};

export const isEditor = async (req, res, next) => {
  const user = await authenticatedUser(req);
  if (user && user.role === 'editor') {
    return next();
  }
  const headerLang = req.acceptsLanguages('en', 'fr', 'kn') || 'kn';
  const message = translate[headerLang].notEditor;

  return serverResponse(res, 401, message);
};

export const isAdmin = async (req, res, next) => {
  const user = await authenticatedUser(req);
  if (user && user.role === 'admin') {
    return next();
  }

  const headerLang = req.acceptsLanguages('en', 'fr', 'kn') || 'kn';
  const message = translate[headerLang].notAdmin;

  return serverResponse(res, 401, message);
};

export const isAdminOrEditor = async (req, res, next) => {
  const user = await authenticatedUser(req);
  if (user) {
    if (user.role === 'editor' || user.role === 'admin') return next();
  }
  const headerLang = req.acceptsLanguages('en', 'fr', 'kn') || 'kn';
  const message = translate[headerLang].notAdmin;

  return serverResponse(res, 401, message);
};
