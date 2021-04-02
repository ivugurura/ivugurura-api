import {
	ValidatorHelper,
	joiValidatorMsg,
	QueryHelper,
	serverResponse
} from '../helpers';
import { Album, Media } from '../models';

export const isAlbumValid = (req, res, next) => {
	let validator = new ValidatorHelper(req.body);
	const errorBody = validator.validateInput('album');
	if (errorBody.error) return joiValidatorMsg(res, errorBody);
	return next();
};
export const doesAlbumExist = async (req, res, next) => {
	let dbHelper = new QueryHelper(Album);
	if (req.params.albumId) {
		const { albumId: id } = req.params;
		const album = await dbHelper.findOne({ id });
		if (album) return next();
	}
	return serverResponse(res, 404, 'Album does not exist');
};
export const doesMediaExist = async (req, res, next) => {
	let dbHelper = new QueryHelper(Media);
	if (req.params.mediaId) {
		const { mediaId } = req.params;
		const attribute = isNaN(mediaId) ? 'slug' : 'id';
		const media = await dbHelper.findOne({ [attribute]: mediaId });
		if (media) {
			req.params.mediaId = media.id;
			return next();
		}
	}
	return serverResponse(res, 404, 'Media does not exist');
};
export const isFileTypeValid = (req, res, next) => {
	const { fileType } = req.params;
	if (fileType && (fileType === 'song' || fileType === 'image')) {
		return next();
	}
	return serverResponse(res, 400, 'Unknown routes');
};
export const isMediaValid = (req, res, next) => {
	let validator = new ValidatorHelper(req.body);
	const errorBody = validator.validateInput('media');
	if (errorBody.error) return joiValidatorMsg(res, errorBody);
	if (req.method === 'PATCH') {
		delete req.body.languageId;
	}
	return next();
};
