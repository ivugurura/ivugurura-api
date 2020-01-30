import { serverResponse } from '../helpers';

export const isAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return serverResponse(res, 401, 'Oops, the system does not know you!');
};

export const isEditor = async (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'editor') return next();
  }
  return serverResponse(res, 401, 'Only for editors');
};

export const isAdmin = async (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') return next();
  }
  return serverResponse(res, 401, 'Only for admins');
};

export const isAdminOrEditor = async (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'editor' || req.user.role === 'admin') return next();
  }
  return serverResponse(res, 401, 'Only for admins');
};
