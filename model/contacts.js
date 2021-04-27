const Contacts = require("./schemas/contactSchema");

const listContacts = async () => {
  const results = await Contacts.find();
  return results;
};

const getContactById = async (id) => {
  const result = await Contacts.findById(id);
  return result;
};

const removeContact = async (id) => {
  const result = await Contacts.findByIdAndRemove(id);
  return result;
};

const addContact = async (body) => {
  const result = await Contacts.create(body);
  return result;
};

const updateContact = async (id, body) => {
  const result = await Contacts.findByIdAndUpdate(
    id,
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
