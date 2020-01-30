import bcrypt from 'bcrypt';

export const hashPassword = password => {
  const salt = bcrypt.genSaltSync(process.env.PASS_SALT);
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};
export const unHashPassword = (password, hashedPass) => {
  return bcrypt.compareSync(password, hashedPass);
};
export const generatJWT = userInfo => {
  const token = jwt.sign(userInfo, process.env.SECRET, { expiresIn: '1d' });
  return token;
};
export const serverResponse = (res, statusCode, message, data) => {
  const messageType = statusCode >= 400 ? 'error' : 'message';
  return res
    .status(statusCode)
    .json({ status: statusCode, [messageType]: message, data });
};
export const joiValidatorMsg = (res, result) => {
  const errors = [];
  const errorsSent = result.error.details;

  for (let index = 0; index < errorsSent.length; index += 1) {
    errors.push(errorsSent[index].message.split('"').join(''));
  }
  return serverResponse(res, 400, errors[0]);
};
