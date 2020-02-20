import multer from 'multer';
import {
  serverResponse,
  QueryHelper,
  uploadMany,
  uploadSingle
} from '../helpers';
import { Album, Media } from '../models';

const dbHelper = new QueryHelper(Album);
const dbMediaHelper = new QueryHelper(Media);
export const createAlbum = async (req, res) => {
  const newAlbum = await dbHelper.create(req.body);
  return serverResponse(res, 201, 'Success', newAlbum);
};
export const getAlbums = async (req, res) => {
  const albums = await dbHelper.findAll();
  return serverResponse(res, 200, 'Success', albums);
};

export const getOneAlbum = async (req, res) => {
  const { albumId: id } = req.params;
  const album = await dbHelper.findOne({ id });
  return serverResponse(res, 200, 'Success', album);
};

export const editAlbumInfo = async (req, res) => {
  const { albumId: id } = req.params;
  await dbHelper.update(req.body, { id });
  return serverResponse(res, 200, 'Album updated');
};

export const deleteAlbum = async (req, res) => {
  const { albumId: id } = req.params;
  await dbHelper.delete({ id });
  return serverResponse(res, 200, 'Album deleted');
};

export const uploadFile = (req, res) => {
  const { isMany } = req.query;
  const upload = isMany ? uploadMany : uploadSingle;
  upload(req, res, uploadError => {
    if (uploadError instanceof multer.MulterError || uploadError)
      return serverResponse(res, 500, uploadError);
    if (!req.file) return serverResponse(res, 400, 'No file selected');
    return serverResponse(res, 200, 'File(s) uploaded');
  });
};
export const addNewMedia = async (req, res) => {
  const newMedia = await dbMediaHelper.create(req.body);
  return serverResponse(res, 201, 'Success', newMedia);
};
