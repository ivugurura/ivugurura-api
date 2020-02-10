import { Router } from 'express';
import {
  getAlbums,
  createAlbum,
  getOneAlbum,
  editAlbumInfo,
  deleteAlbum,
  uploadFile
} from '../../controllers/albumController';
import {
  isAdminOrEditor,
  catchErrors,
  isAlbumValid,
  doesAlbumExist,
  isFileTypeValid
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

albumRoutes.post('/upload/:fileType', isFileTypeValid, catchErrors(uploadFile));

export default albumRoutes;
