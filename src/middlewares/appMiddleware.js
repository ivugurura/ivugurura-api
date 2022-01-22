import { existsSync, mkdirSync } from 'fs';
import { serverResponse, QueryHelper, getLang, notifyMe } from '../helpers';
import { Language } from '../models';
import { translate } from '../locales';

const dbHelper = new QueryHelper(Language);
const isDev = process.env.NODE_ENV === 'development';
export const handleErrors = (err, req, res, next) => {
	const lang = getLang(req);
	let message = translate[lang].error500;
	if (isDev) {
		message = err.message;
		console.log(err.stack);
	} else {
		notifyMe(err.message, err.stack)
			.then(() => {
				console.log('NOTIFIER SENT');
			})
			.catch((error) => {
				console.log('NOTIFIER NOT SENT', error);
			});
	}

	return serverResponse(res, 500, message);
};

export const monitorDevActions = (req, res, next) => {
	const lang = getLang(req);
	const songsDir = process.env.SONGS_ZONE;
	const imagesDir = process.env.IMAGES_ZONE;
	if (!existsSync('./public')) mkdirSync('./public');
	if (!existsSync(songsDir)) mkdirSync(songsDir);
	if (!existsSync(imagesDir)) mkdirSync(imagesDir);
	if (isDev) {
		const user = req.isAuthenticated()
			? `User: ${req.user.username}`
			: 'UNKNOWN user';
		console.log(
			`${user} is using ${req.device.type},\n 
        Route: ${req.path}, method: ${req.method}, Language: ${lang}\n
        body: ${JSON.stringify(req.body)},\n
        session: ${JSON.stringify(req.session)},\n
        IP: ${req.ip}, host: ${req.headers.host}`
		);
		// User Agent: ${JSON.stringify(req.useragent)}
	}
	return next();
};

export const route404 = (req, res) => {
	const lang = getLang(req);
	const message = translate[lang].error404;

	return serverResponse(res, 404, message);
};
export const catchErrors = (fn) => (req, res, next) => {
	Promise.resolve(fn(req, res, next)).catch(next);
};
export const setLanguage = async (req, res, next) => {
	const lang = getLang(req);
	const language = await dbHelper.findOne({ short_name: lang });
	req.body.languageId = language ? language.id : 1;
	return next();
};
