import { serverResponse } from '../helpers';
import { translate } from '../locales';

export const isAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) return next();

  const headerLang = req.acceptsLanguages('en', 'fr', 'kn') || 'kn';
  const message = translate[headerLang].notAuth;
  return serverResponse(res, 401, message);
};

export const isEditor = async (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'editor') return next();
  }
  const headerLang = req.acceptsLanguages('en', 'fr', 'kn') || 'kn';
  const message = translate[headerLang].notEditor;

  return serverResponse(res, 401, message);
};

export const isAdmin = async (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') return next();
  }
  const headerLang = req.acceptsLanguages('en', 'fr', 'kn') || 'kn';
  const message = translate[headerLang].notAdmin;

  return serverResponse(res, 401, message);
};

export const isAdminOrEditor = async (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'editor' || req.user.role === 'admin') return next();
  }
  const headerLang = req.acceptsLanguages('en', 'fr', 'kn') || 'kn';
  const message = translate[headerLang].notAdmin;

  return serverResponse(res, 401, message);
};
