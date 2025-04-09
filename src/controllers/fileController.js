import { Topic } from "../models";
import { QueryHelper, serverResponse, uploadSingle } from "../helpers";
import multer from "multer";

const dbTopicHelper = new QueryHelper(Topic);

export const finalizeSingleUpload = async (req, res) => {
  const { fileType } = req.params;
  const { prevFile, update } = req.query;

  return uploadSingle(req, res, async uploadError => {
    if (uploadError instanceof multer.MulterError || uploadError) {
      const errorMsg = uploadError.message || uploadError;
      return serverResponse(res, 500, errorMsg);
    }

    if (!req.file) return serverResponse(res, 400, "No file selected");
    const fileName = req.file.filename;
    if (fileType === "image" && update === "yes") {
      await dbTopicHelper.update(
        { coverImage: fileName },
        { coverImage: prevFile },
      );
    }
    return serverResponse(res, 200, "File(s) uploaded", fileName);
  });
};
