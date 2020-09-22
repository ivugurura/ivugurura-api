import bcrypt from 'bcrypt';
import slugify from 'slugify';
import uniqid from 'uniqid';
import jwt, { verify } from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
// import nodemailer from 'nodemailer';
// import sgTransport from 'nodemailer-sendgrid-transport';
import { User } from '../models';
import { QueryHelper } from './QueryHelper';

const dbUser = new QueryHelper(User);
export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(process.env.PASS_SALT);
  const hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
};
export const unHashPassword = (password, hashedPass) => {
  return bcrypt.compareSync(password, hashedPass);
};
export const generatJWT = (userInfo) => {
  const token = jwt.sign(userInfo, process.env.SECRET, { expiresIn: '1w' });
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

export const generateSlug = (title) => {
  const uniqueId = uniqid.process();
  const slug = `${slugify(title, { lower: true })}-${uniqueId}`;
  return slug;
};
export const paginator = ({ page, pageSize }) => {
  const offset = Number((page - 1) * pageSize) || 0;
  const limit = Number(pageSize) || 20;
  return { offset, limit };
};
export const authenticatedUser = async (req) => {
  const { user, useragent, headers } = req;
  if (
    useragent.isFirefox ||
    useragent.isOpera ||
    useragent.isChromeOS ||
    useragent.isEdge
  ) {
    const token = headers.authorization;
    try {
      const { id } = verify(token, process.env.SECRET);
      const user = await dbUser.findOne({ id });
      if (user.id) {
        return user;
      }
    } catch (error) {
      return null;
    }
  } else if ((useragent.browser = 'PostmanRuntime' && req.isAuthenticated())) {
    return user;
  }
  return null;
};

export const sendEmail = async (messageBody) => {
  // const msg = {
  //   to: 'test@example.com',
  //   from: 'test@example.com',
  //   subject: 'Sending with Twilio SendGrid is Fun',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // };
  // sgMail.send(msg);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  return await sgMail.send(messageBody);
};
export const getLang = (req) =>
  req.acceptsLanguages('en', 'kn', 'fr', 'sw') || 'en';
