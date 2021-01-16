import { Router } from 'express';
import {
	getAlbums,
	createAlbum,
	getOneAlbum,
	editAlbumInfo,
	deleteAlbum,
	uploadFile,
	addNewMedia,
	deleteFile,
	getMedia,
	downloadSong,
	updateMedia,
	deleteMedia
} from '../../controllers/albumController';
import { uploadSingleFile } from '../../helpers';
import {
	isAdminOrEditor,
	catchErrors,
	isAlbumValid,
	doesAlbumExist,
	isFileTypeValid,
	isMediaValid,
	doesMediaExist
} from '../../middlewares';

const albumRoutes = Router();
albumRoutes.post('/', isAdminOrEditor, isAlbumValid, catchErrors(createAlbum));
albumRoutes.get('/', getAlbums);
albumRoutes.get(
	'/:albumId',
	catchErrors(doesAlbumExist),
	catchErrors(getOneAlbum)
);
albumRoutes.patch(
	'/:albumId',
	isAdminOrEditor,
	catchErrors(doesAlbumExist),
	isAlbumValid,
	catchErrors(editAlbumInfo)
);

albumRoutes.delete(
	'/:albumId',
	isAdminOrEditor,
	catchErrors(doesAlbumExist),
	catchErrors(deleteAlbum)
);

albumRoutes.post(
	'/upload/:fileType',
	isFileTypeValid,
	catchErrors(uploadSingleFile)
);
albumRoutes.delete(
	'/:fileType/:fileName',
	isFileTypeValid,
	catchErrors(deleteFile)
);
albumRoutes.post(
	'/add',
	isAdminOrEditor,
	isMediaValid,
	catchErrors(addNewMedia)
);
albumRoutes.patch(
	'/media/:mediaId',
	isAdminOrEditor,
	isMediaValid,
	catchErrors(doesMediaExist),
	catchErrors(updateMedia)
);
albumRoutes.delete(
	'/media/:mediaId/del',
	isAdminOrEditor,
	catchErrors(doesMediaExist),
	catchErrors(deleteMedia)
);
albumRoutes.get('/medias/:mediaType', catchErrors(getMedia));
albumRoutes.get('/download/:mediaId', catchErrors(downloadSong));

export default albumRoutes;
