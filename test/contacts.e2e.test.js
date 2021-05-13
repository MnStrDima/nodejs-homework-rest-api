const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const { User, contacts, newContact } = require("../model/__mocks__/data");
require("dotenv").config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User.id }, JWT_SECRET_KEY);
User.token = token;

jest.mock("../model/contacts.js");
jest.mock("../model/users.js");

describe("Testing route: api/contacts", () => {
  let newContactId = null;
  describe("GET /api/contacts", () => {
    test("200 status for request GET: /contacts", async (done) => {
      const res = await request(app)
        .get("/api/contacts")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contacts).toBeInstanceOf(Array);
      done();
    });

    test("200 status for request GET: /contacts/:id", async (done) => {
      const contact = contacts[0];
      const res = await request(app)
        .get(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact._id).toBe(contact._id);
      done();
    });

    test("404 status for request GET: /contacts/:id", async (done) => {
      const res = await request(app)
        .get(`/api/contacts/609c3eb1fb21d16fb0da2160`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });

    test("400 status for request GET: /contacts/:id", async (done) => {
      const res = await request(app)
        .get(`/api/contacts/609c3eb1fb21d160da2160`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe("POST /api/contacts", () => {
    test("201 status for request POST: /contacts", async (done) => {
      const res = await request(app)
        .post("/api/contacts")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send(newContact);
      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      newContactId = res.body.data.contact._id;
      done();
    });

    test("400 status for request POST: /contacts wrong field", async (done) => {
      const res = await request(app)
        .post("/api/contacts")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({ ...newContact, test: 1 });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    test("400 status for request POST: /contacts without field", async (done) => {
      const res = await request(app)
        .post("/api/contacts")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({ name: "Dmitriy" });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe("PUT /api/contacts/:id", () => {
    test("200 status for request PUT: /contacts/:id", async (done) => {
      const res = await request(app)
        .put(`/api/contacts/${newContactId}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({ name: "Dmitriy" });
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact.name).toBe("Dmitriy");
      done();
    });

    test("400 status for request PUT: /contacts/:id wrong field", async (done) => {
      const res = await request(app)
        .put(`/api/contacts/${newContactId}`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({ test: 1 });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    test("404 status for request PUT: /contacts/:id without field", async (done) => {
      const res = await request(app)
        .put("/api/contacts/609c3eb1fb21d16fb0da2160")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({ name: "Dmitriy" });
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("PATCH /api/contacts/:id/favorite", () => {
    test("200 status for request PATCH: /contacts/:id/favorite", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${newContactId}/favorite`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({ favorite: true });
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact.favorite).toBe(true);
      done();
    });

    test("400 status for request PUT: /contacts/:id/favorite wrong field", async (done) => {
      const res = await request(app)
        .patch(`/api/contacts/${newContactId}/favorite`)
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({ test: 1 });
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    test("404 status for request PUT: /contacts/:id/favorite without field", async (done) => {
      const res = await request(app)
        .patch("/api/contacts/609c3eb1fb21d16fb0da2160/favorite")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json")
        .send({ favorite: true });
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("DELETE /api/contacts/:id", () => {
    const contact = contacts[1];
    test("200 status for request DELETE: /contacts/:id", async (done) => {
      const res = await request(app)
        .delete(`/api/contacts/${contact._id}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data.contact).toStrictEqual(contact);
      done();
    });

    test("400 status for request DELETE: /contacts/:id wrong id", async (done) => {
      const res = await request(app)
        .delete("/api/contacts/1234")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(400);
      expect(res.body).toBeDefined();
      done();
    });

    test("404 status for request DELETE: /contacts/:id with false id", async (done) => {
      const res = await request(app)
        .delete("/api/contacts/609c3eb1fb21d16fb0da2160/favorite")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(404);
      expect(res.body).toBeDefined();
      done();
    });
  });
});
