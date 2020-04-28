import { serverResponse, QueryHelper } from '../helpers';
import { Language } from '../models';
import { translate } from '../locales';

const dbHelper = new QueryHelper(Language);
export const handleErrors = (err, req, res, next) => {
  console.log(err.stack);
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
  const headerLang = req.headers['accept-language'] || 'kn';
  const message = translate[headerLang].error404;
  return serverResponse(res, 404, message);
};
export const catchErrors = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
export const setLanguage = async (req, res, next) => {
  const headerLang = req.headers['accept-language'] || 'kn';
  const language = await dbHelper.findOne({ short_name: headerLang });
  req.body.languageId = language ? language.id : 1;
  return next();
};
