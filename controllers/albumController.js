import multer from 'multer';
import { unlink } from 'fs';
import {
  serverResponse,
  QueryHelper,
  uploadMany,
  uploadSingle,
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
  upload(req, res, (uploadError) => {
    if (uploadError instanceof multer.MulterError || uploadError)
      return serverResponse(res, 500, uploadError);
    if (!req.file) return serverResponse(res, 400, 'No file selected');
    const fileName = req.file.filename;
    return serverResponse(res, 200, 'File(s) uploaded', fileName);
  });
};
export const deleteFile = (req, res) => {
  const { fileName, fileType } = req.params;
  const { IMAGES_ZONE, SONGS_ZONE } = process.env;
  const filePath = fileType === 'image' ? IMAGES_ZONE : SONGS_ZONE;
  unlink(`${filePath}/${fileName}`, (error) => {
    if (error) return serverResponse(res, 500, 'File not delete');
    return serverResponse(res, 200, 'File deleted');
  });
};
export const addNewMedia = async (req, res) => {
  const newMedia = await dbMediaHelper.create(req.body);
  return serverResponse(res, 201, 'Success', newMedia);
};
export const getMedia = async (req, res) => {
  const attributes = ['title', 'mediaLink', 'type'];
  const medias = await dbMediaHelper.findAll(null, null, null, attributes);
  return serverResponse(res, 200, 'Success', medias);
};
