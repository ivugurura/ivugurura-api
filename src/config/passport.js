import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models";
import { unHashPassword, hashPassword } from "../helpers";
import { Op } from "sequelize";

const strategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const userSerializer = (user, done) => {
  done(null, user.id);
};

const userDeserializer = (id, done) => {
  User.findOne({ where: { id }, logging: false })
    .then((user) => done(null, user))
    .catch((error) => done(error));
};

const localLoginStrategy = new LocalStrategy(
  strategyOptions,
  (req, email, password, done) => {
    email = req.body.email.toLowerCase().trim();
    password = req.body.password;
    User.findOne({ where: { email }, logging: false })
      .then((user) => {
        if (!user) return done({ message: "Invalid email" });
        if (!unHashPassword(password, user.password))
          return done({ message: "Invalid password" });
        if (!user.isActive) {
          let msg = "You are not allowed to access the system. ";
          msg += "Please contact the Administrator. He'll let you in";
          return done({ message: msg });
        }
        user = user.toJSON();
        return done(null, user);
      })
      .catch((error) => done(error));
  }
);

const localSignupStrategy = new LocalStrategy(
  strategyOptions,
  (req, email, password, done) => {
    email = email.toLowerCase().trim();
    const username = req.body.username.toLowerCase().trim();
    const names = req.body.names.trim();
    password = hashPassword(password);
    const access_lvl = req.body.access_lvl;
    User.findOne({
      where: { [Op.or]: [{ email, username }] },
      logging: false,
    })
      .then((user) => {
        if (user) return done({ message: "Email or username has taken" });
        User.create(
          { email, username, password, names, access_lvl },
          { logging: false }
        )
          .then((user) => done(null, user))
          .catch((error) => done(error));
      })
      .catch((error) => done(error));
  }
);

export const configurePassport = (passport) => {
  passport.serializeUser(userSerializer);
  passport.deserializeUser(userDeserializer);

  passport.use("local.login", localLoginStrategy);
  passport.use("local.signup", localSignupStrategy);
};
