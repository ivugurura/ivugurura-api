import crypto from "crypto";
import { authenticatedUser, serverResponse, systemRoles } from "../helpers";

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const validateBookAccess = async (req, res, next) => {
  const book = req.body.entity;
  if (book.isDownloadable) {
    return next();
  }

  const user = await authenticatedUser(req);
  if (book.userId === user?.id || user?.role <= systemRoles.editor) {
    return next();
  }

  const apiKey = "your-secret-key";
  const requestTimestamp = req.headers["x-timestamp"];
  const requestHash = req.headers["x-signature"];

  const errMsg = sy => "You are not allowed to download this book: " + sy;
  if (!requestTimestamp || !requestHash) {
    return serverResponse(res, 403, errMsg("MA Headers"));
  }

  const expectedHash = crypto
    .createHmac("sha256", apiKey)
    .update(requestTimestamp)
    .digest("hex");

  if (requestHash === expectedHash) {
    return next();
  }
  return serverResponse(res, 403, errMsg("INV signature"));
};
