const { User, users } = require("./data");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const SALT_QUANTITY = 6;
require("dotenv").config();

// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// const issueToken = (payload, secret) => jwt.sign(payload, secret);
// const newToken = issueToken({ id: User.id }, JWT_SECRET_KEY);

const findUserById = jest.fn((id) => {
  const [user] = users.filter((user) => String(user._id) === String(id));
  return user;
});

const findUserByEmail = jest.fn((email) => {
  const [user] = users.filter((user) => String(user.email) === String(email));
  return user;
});

const createUser = jest.fn(
  ({
    name = "Guest",
    email,
    password,
    subscription = "starter",
    avatarURL = function () {
      return gravatar.url(this.email, { s: "250" }, true);
    },
    token = null,
  }) => {
    const pass = bcrypt.hashSync(
      password,
      bcrypt.genSaltSync(SALT_QUANTITY),
      null
    );
    const newUser = {
      name,
      email,
      password: pass,
      subscription,
      _id: "609c3dfffb21d16fb0da2168",
      avatarURL,
      token,
      validPassword: function (pass) {
        return bcrypt.compareSync(pass, this.password);
      },
    };
    users.push(newUser);
    return newUser;
  }
);

const updateToken = jest.fn((id, token) => {
  const [user] = users.filter((user) => String(user._id) === String(id));
  user.token = token;
  return user;
});

const updateSubscription = jest.fn((id, subscription) => {
  const [user] = users.filter((user) => String(user._id) === String(id));
  user.subscription = subscription;
  return user;
});

const updateAvatar = jest.fn((id, avatarURL) => {
  const [user] = users.filter((user) => String(user._id) === String(id));
  user.avatarURL = avatarURL;
  return user;
});

module.exports = {
  findUserById,
  findUserByEmail,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar,
};
