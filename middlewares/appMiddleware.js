import { serverResponse } from '../helpers';

export const handleErrors = (err, req, res, next) => {
  return serverResponse(res, 500, err.message);
};

export const monitorDevActions = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    const user = req.isAuthenticated()
      ? `User: ${req.user.username}`
      : 'UNKNOWN user';
    console.log(
      `${user} is using ${req.device.type}, 
        Route: ${req.path}, method: ${req.method}, 
        body: ${JSON.stringify(req.body)}, 
        session: ${JSON.stringify(req.session)},
        IP: ${req.ip} `
    );
  }
  return next();
};

export const route404 = (req, res) => {
  return serverResponse(res, 404, 'Sorry you have lost');
};
export const catchErrors = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
