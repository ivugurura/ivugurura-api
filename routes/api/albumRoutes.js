import { Router } from 'express';
import {
  getAlbums,
  createAlbum,
  getOneAlbum,
  editAlbumInfo,
  deleteAlbum
} from '../../controllers/albumController';
import {
  isAdminOrEditor,
  catchErrors,
  isAlbumValid,
  doesAlbumExist
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

export default albumRoutes;
