import multer from 'multer';
import { unlink } from 'fs';
import {
  serverResponse,
  QueryHelper,
  uploadMany,
  uploadSingle,
} from '../helpers';
import { Album, Media, Topic } from '../models';
import { ConstantHelper } from '../helpers/ConstantHelper';

const dbHelper = new QueryHelper(Album);
const dbMediaHelper = new QueryHelper(Media);
const dbTopicHelper = new QueryHelper(Topic);
const constHelper = new ConstantHelper();
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

export const uploadFile = async (req, res) => {
  const { isMany, prevFile, update } = req.query;
  const { fileType } = req.params;
  const { IMAGES_ZONE, SONGS_ZONE } = process.env;

  const upload = isMany ? uploadMany : uploadSingle;

  const filePath = fileType === 'image' ? IMAGES_ZONE : SONGS_ZONE;
  /**
   * Delete the previous file first then
   * Upload a new one
   */
  unlink(`${filePath}/${prevFile}`, (error) => {
    if (error) console.log('Error occurred, not deleted');

    upload(req, res, async (uploadError) => {
      if (uploadError instanceof multer.MulterError || uploadError)
        return serverResponse(res, 500, uploadError);
      if (!req.file) return serverResponse(res, 400, 'No file selected');
      const fileName = req.file.filename;
      /**
       * Update a topic cover image if necessary
       */
      if (fileType === 'image' && update !== 'null') {
        await dbTopicHelper.update(
          { coverImage: fileName },
          { coverImage: prevFile }
        );
      }
      return serverResponse(res, 200, 'File(s) uploaded', fileName);
    });
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
  const { mediaType } = req.params;
  const conditions = mediaType !== 'all' ? { type: mediaType } : null;
  const attributes = ['title', 'mediaLink', 'type'];
  const medias = await dbMediaHelper.findAll(
    conditions,
    constHelper.mediaIncludes(),
    null,
    attributes
  );
  return serverResponse(res, 200, 'Success', medias);
};
