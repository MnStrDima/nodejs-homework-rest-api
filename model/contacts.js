const Contacts = require("./schemas/contactSchema");

const listContacts = async (userId, query) => {
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = null,
    limit = 5,
    page = 0,
  } = query;
  const searchOptions = { owner: userId };
  if (favorite !== null) {
    searchOptions.favorite = favorite;
  }
  const results = await Contacts.paginate(searchOptions, {
    limit,
    page,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: filter ? filter.split("|").join(" ") : "",
    populate: {
      path: "owner",
      select: "name email",
    },
  });
  return results;
};

const getContactById = async (userId, id) => {
  const result = await Contacts.findById({ _id: id, owner: userId }).populate({
    path: "owner",
    select: "name email",
  });
  return result;
};

const removeContact = async (userId, id) => {
  const result = await Contacts.findByIdAndRemove({
    _id: id,
    owner: userId,
  }).populate({
    path: "owner",
    select: "name email",
  });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contacts.create({ ...body, owner: userId });
  return result;
};

const updateContact = async (userId, id, body) => {
  const result = await Contacts.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  ).populate({
    path: "owner",
    select: "name email",
  });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
