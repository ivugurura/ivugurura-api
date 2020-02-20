import multer from 'multer';
import path from 'path';
import { ConstantHelper } from './ConstantHelper';

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    let fileStorage = null;
    const { path } = req;
    if (path.includes('upload/image')) fileStorage = process.env.IMAGES_ZONE;
    else if (path.includes('upload/song')) fileStorage = process.env.SONGS_ZONE;
    else callBack(ConstantHelper.serverError);
    callBack(null, fileStorage);
  },
  filename: (req, file, callBack) => {
    let ext = path.extname(file.originalname).split('.')[1];
    let fileName = file.originalname.split('.')[0];
    let mediaLink = `${fileName}-${Date.now()}.${ext}`;
    callBack(null, mediaLink);
  }
});

export const uploadSingle = multer({ storage }).single('file');
export const uploadMany = multer({ storage }).array('file');
