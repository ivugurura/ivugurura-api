/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const validateBookAccess = (req, res, next) => {
  const apiKey = "your-secret-key";
  const requestTimestamp = req.headers["x-timestamp"];
  const requestHash = req.headers["x-signature"];

  if (!requestTimestamp || !requestHash) {
    return res.status(403).json({ error: "Missing authentication headers" });
  }

  const expectedHash = crypto
    .createHmac("sha256", apiKey)
    .update(requestTimestamp)
    .digest("hex");

  if (requestHash !== expectedHash) {
    return res.status(403).json({ error: "Invalid signature" });
  }

  return next();
};
