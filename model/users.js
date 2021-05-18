const User = require("./schemas/userSchema");

const findUserById = async (id) => {
  return await User.findById(id);
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const findUserByVerificationToken = async (token) => {
  return await User.findOne({ verifyToken: token });
};

const createUser = async (userOptions) => {
  const user = new User(userOptions);
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.findByIdAndUpdate(id, { token });
};

const updateVerificationToken = async (id, verify, verifyToken) => {
  return await User.findByIdAndUpdate(id, { verify, verifyToken });
};

const updateSubscription = async (id, subscription) => {
  return await User.findByIdAndUpdate(id, { ...subscription }, { new: true });
};

const updateAvatar = async (id, avatarURL) => {
  return await User.findByIdAndUpdate(id, { avatarURL }, { new: true });
};

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByVerificationToken,
  createUser,
  updateToken,
  updateVerificationToken,
  updateSubscription,
  updateAvatar,
};
