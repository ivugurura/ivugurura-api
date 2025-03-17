// import crypto from "crypto";
import { authenticatedUser, serverResponse, systemRoles } from "../helpers";

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const validateBookAccess = async (req, res, next) => {
  const book = req.body.book;
  if (book.isDownloadable) {
    return next();
  }

  const user = await authenticatedUser(req);
  if (book.userId === user?.id || user.role <= systemRoles.editor) {
    return next();
  }

  return serverResponse(res, 403, "You are not allowed to download this book");
  // const apiKey = "your-secret-key";
  // const requestTimestamp = req.headers["x-timestamp"];
  // const requestHash = req.headers["x-signature"];

  // if (!requestTimestamp || !requestHash) {
  //   return res.status(403).json({ error: "Missing authentication headers" });
  // }

  // const expectedHash = crypto
  //   .createHmac("sha256", apiKey)
  //   .update(requestTimestamp)
  //   .digest("hex");

  // if (requestHash !== expectedHash) {
  //   return res.status(403).json({ error: "Invalid signature" });
  // }

  // return next();
};
