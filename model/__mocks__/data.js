const contacts = [
  {
    _id: "609c3eb1fb21d16fb0da2169",
    favorite: false,
    name: "Test",
    email: "test@gmail.com",
    phone: "0632493000",
    owner: "609c3dfffb21d16fb0da2167",
    createdAt: "2021-05-12T20:46:41.609+00:00",
    updatedAt: "2021-05-12T20:46:41.609+00:00",
  },
  {
    _id: "609c3eb9fb21d16fb0da216a",
    favorite: false,
    name: "Test2",
    email: "test2@gmail.com",
    phone: "0632493000",
    owner: "609c3dfffb21d16fb0da2167",
    createdAt: "2021-05-12T20:46:49.824+00:00",
    updatedAt: "2021-05-12T20:46:49.824+00:00",
  },
];

const newContact = {
  name: "Test3",
  email: "test3@gmail.com",
  phone: "0632493000",
};

const User = {
  _id: "609c3dfffb21d16fb0da2167",
  id: "609c3dfffb21d16fb0da2167",
  name: "Guest",
  subscription: "business",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwOWMzZGZmZmIyMWQxNmZiM...",
  email: "dimondimon@gmail.com",
  password: "$2a$06$.M9CW7t/Zh6Q79UYhmMFSeNUGUXKpjIjHI8lQw0v64Sr3g3.Ey.P.",
  avatarURL: "avatars/dimondimon@gmail.com-myAvatar.jpg",
  createdAt: "2021-05-12T20:43:43.789+00:00",
  updatedAt: "2021-05-12T20:44:42.329+00:00",
};

const users = [];
users[0] = User;

const newUser = { email: "dimondimon2@gmail.com", password: "123456" };

module.exports = {
  contacts,
  newContact,
  User,
  users,
  newUser,
};
