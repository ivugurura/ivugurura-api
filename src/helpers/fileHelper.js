import multer from "multer";
import path from "path";
import { ACCEPTED_FILE_SIZE, isFileAllowed } from "./util";
import { unlinkSync, existsSync, mkdirSync } from "fs";

const PLACEHOLDER_PATTERN = /^{.*}$|<.*>|placeholder|path[/\\]to/i;

const filePathConfig = {
  develop: {
    image: ["IMAGES_ZONE_DEV", "IMAGES_ZONE"],
    song: ["SONGS_ZONE_DEV", "SONGS_ZONE"],
    bookCover: ["BOOK_COVERS_ZONE_DEV", "BOOK_COVERS_ZONE"],
    bookFile: ["BOOK_FILES_ZONE_DEV", "BOOK_FILES_ZONE"],
  },
  staging: {
    image: ["IMAGES_ZONE_STG", "IMAGES_ZONE"],
    song: ["SONGS_ZONE_STG", "SONGS_ZONE"],
    bookCover: ["BOOK_COVERS_ZONE_STG", "BOOK_COVERS_ZONE"],
    bookFile: ["BOOK_FILES_ZONE_STG", "BOOK_FILES_ZONE"],
  },
  production: {
    image: ["IMAGES_ZONE"],
    song: ["SONGS_ZONE"],
    bookCover: ["BOOK_COVERS_ZONE"],
    bookFile: ["BOOK_FILES_ZONE"],
  },
};

const isPlaceholderPath = value => {
  return (
    typeof value !== "string" ||
    value.trim() === "" ||
    PLACEHOLDER_PATTERN.test(value.trim())
  );
};

const resolveEnvFilePath = envVars => {
  for (const envVar of envVars) {
    const value = process.env[envVar];
    if (value && value.trim() !== "") {
      return value.trim();
    }
  }
  return "";
};

const resolveFilePaths = env => {
  const config = filePathConfig[env] || filePathConfig.develop;

  return Object.fromEntries(
    Object.entries(config).map(([key, envVars]) => [
      key,
      resolveEnvFilePath(envVars),
    ]),
  );
};

const ensureDirectory = directory => {
  const resolved = path.resolve(directory);
  if (!existsSync(resolved)) {
    mkdirSync(resolved, { recursive: true });
  }
  return resolved;
};

export const verifyFileEnvironmentPaths = () => {
  const env = process.env.NODE_ENV || "develop";
  const filePaths = resolveFilePaths(env);

  Object.entries(filePaths).forEach(([key, directory]) => {
    if (!directory) {
      throw new Error(
        `Missing environment path for file type '${key}' in NODE_ENV='${env}'. ` +
          `Set the appropriate env var(s): ${filePathConfig[env][key].join(", ")}`,
      );
    }

    if (isPlaceholderPath(directory)) {
      throw new Error(
        `Environment variable for file type '${key}' is a placeholder: '${directory}'. ` +
          `Replace it with a real directory path before starting the app.`,
      );
    }

    filePaths[key] = ensureDirectory(directory);
  });

  return filePaths;
};

export const getFilePath = key => {
  const filePaths = resolveFilePaths(process.env.NODE_ENV || "develop");
  const value = filePaths[key];

  if (!value) {
    throw new Error(`No file path found for '${key}'.`);
  }

  if (isPlaceholderPath(value)) {
    throw new Error(
      `File path for '${key}' is a placeholder and cannot be used: ${value}`,
    );
  }

  return path.resolve(value);
};

export const filePathsMap = verifyFileEnvironmentPaths();

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
  let fileName = file.originalname
    .split(".")[0]
    .toLowerCase()
    .replace(/\W/g, "-")
    .trim();
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
