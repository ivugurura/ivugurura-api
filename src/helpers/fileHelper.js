import multer from "multer";
import path from "path";
import { ACCEPTED_FILE_SIZE, isFileAllowed } from "./util";
import { unlinkSync } from "fs";

export const getFilePath = key => {
  const vals = {
    develop: {
      image: process.env.IMAGES_ZONE_DEV,
      song: process.env.SONGS_ZONE_DEV,
      bookCover: process.env.BOOK_COVERS_ZONE_DEV,
      bookFile: process.env.BOOK_FILES_ZONE_DEV,
    },
    staging: {
      image: process.env.IMAGES_ZONE_STG,
      song: process.env.SONGS_ZONE_STG,
      bookCover: process.env.BOOK_COVERS_ZONE_STG,
      bookFile: process.env.BOOK_FILES_ZONE_STG,
    },
    production: {
      image: process.env.IMAGES_ZONE,
      song: process.env.SONGS_ZONE,
      bookCover: process.env.BOOK_COVERS_ZONE,
      bookFile: process.env.BOOK_FILES_ZONE,
    },
  };
  const env = process.env.NODE_ENV || "develop";

  if (!vals[env] || !vals[env][key]) {
    throw new Error(`No file path found for ${env}`);
  }
  return vals[env][key];
};

export const filePathsMap = {
  image: getFilePath("image"),
  song: getFilePath("song"),
  bookCover: getFilePath("bookCover"),
  bookFile: getFilePath("bookFile"),
};

const getDestination = (req, file, callBack) => {
  const { fileType } = req.params;
  const { prevFile } = req.query;
  const filesDir = filePathsMap[fileType];

  if (prevFile) {
    unlinkSync(`${filesDir}/${prevFile}`);
  }

  callBack(null, filesDir);
};
const getFileName = (req, file, callBack) => {
  let ext = path.extname(file.originalname).split(".")[1];
  let fileName = file.originalname.split(".")[0].replace(/\W/g, " ").trim();
  let mediaLink = `${fileName}-${Date.now()}.${ext}`;
  callBack(null, mediaLink);
};

export const diskStorage = multer.diskStorage({
  destination: getDestination,
  filename: getFileName,
});

export const filterFile = (req, file, filterCallBack) => {
  let type = "images";
  const { fileType } = req.params;
  if (fileType === "song") type = "audios";
  if (fileType === "bookFile") type = "files";

  isFileAllowed(file, type, (error, allowed) => {
    if (error) return filterCallBack(error);
    return filterCallBack(null, allowed);
  });
};

export const uploadSingle = multer({
  storage: diskStorage,
  limits: { fileSize: ACCEPTED_FILE_SIZE },
  fileFilter: filterFile,
}).single("file");
