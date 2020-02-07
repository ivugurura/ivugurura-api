import { serverResponse, QueryHelper } from '../helpers';
import { Album } from '../models';

const dbHelper = new QueryHelper(Album);
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
