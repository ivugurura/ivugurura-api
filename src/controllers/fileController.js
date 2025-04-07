import { Topic } from "../models";
import { QueryHelper, serverResponse } from "../helpers";

const dbTopicHelper = new QueryHelper(Topic);
export const finalizeUpload = async (req, res) => {
  const { fileType } = req.params;
  const { prevFile, update } = req.query;

  if (!req.file) return serverResponse(res, 400, "No file selected");
  const fileName = req.file.filename;
  if (fileType === "image" && update === "yes") {
    await dbTopicHelper.update(
      { coverImage: fileName },
      { coverImage: prevFile },
    );
  }
  return serverResponse(res, 200, "File(s) uploaded", fileName);
};
