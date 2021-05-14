const { contacts } = require("./data");

const listContacts = jest.fn((userId, query) => {
  const { limit = 5, page = 0 } = query;
  return { contacts, total: contacts.length, page, limit };
});

const getContactById = jest.fn((userId, id) => {
  const [contact] = contacts.filter(
    (contact) =>
      String(contact._id) === String(id) &&
      String(contact.owner) === String(userId)
  );
  return contact;
});

const removeContact = jest.fn((userId, id) => {
  const index = contacts.findIndex(
    (contact) =>
      String(contact._id) === String(id) &&
      String(contact.owner) === String(userId)
  );

  if (index === -1) {
    return null;
  }
  const [contact] = contacts.splice(index, 1);
  return contact;
});

const addContact = jest.fn((userId, body) => {
  contacts.push({ ...body, _id: "609c3eb9fb21d16fb0da216b", owner: userId });
  return { ...body, _id: "609c3eb9fb21d16fb0da216b", owner: userId };
});

const updateContact = jest.fn((userId, id, body) => {
  let [contact] = contacts.filter(
    (contact) =>
      String(contact._id) === String(id) &&
      String(contact.owner) === String(userId)
  );
  if (contact) {
    contact = { ...contact, ...body };
  }
  return contact;
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
