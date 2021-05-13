const request = require("supertest");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const app = require("../app");
const { User, newUser, users } = require("../model/__mocks__/data");
require("dotenv").config();

const STATIC_DIR = process.env.STATIC_DIR;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const issueToken = (payload, secret) => jwt.sign(payload, secret);
const token = issueToken({ id: User.id }, JWT_SECRET_KEY);
User.token = token;

jest.mock("../model/contacts.js");
jest.mock("../model/users.js");

describe("Testing route: api/users", () => {
  describe("PATCH /api/users/avatars", () => {
    test("200 status for request PATCH: /users/avatars", async (done) => {
      const buffer = await fs.readFile("./test/myAvatar.jpg");
      const newAvatarName = `${STATIC_DIR}/${User.email}-myAvatar.jpg`;
      const res = await request(app)
        .patch("/api/users/avatars")
        .set("Authorization", `Bearer ${token}`)
        .attach("avatar", buffer, "myAvatar.jpg");
      expect(res.status).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.ResponseBody.avatarURL).toEqual(newAvatarName);
      done();
    });

    test("401 status for request PATCH: /users/avatars", async (done) => {
      const res = await request(app)
        .patch("/api/users/avatars")
        .set("Authorization", `Bearer 123456`);
      expect(res.status).toEqual(401);
      expect(res.body).toBeDefined();
      done();
    });
  });

  describe("POST /api/users/signup", () => {
    test("201 status for request POST: /api/users/signup", async (done) => {
      const res = await request(app).post("/api/users/signup").send(newUser);
      expect(res.status).toEqual(201);
      expect(res.body).toBeDefined();
      done();
    });

    test("409 status for request POST: /api/users/signup with used email", async (done) => {
      const res = await request(app).post("/api/users/signup").send(newUser);
      expect(res.status).toEqual(409);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("POST /api/users/login", () => {
    // test("200 status for request POST: /api/users/login", async (done) => {
    //   const res = await request(app).post("/api/users/login").send(newUser);
    //   expect(res.status).toEqual(200);
    //   expect(res.body).toBeDefined();
    //   done();
    // });

    test("401 status for request POST: /api/users/login with used email", async (done) => {
      const res = await request(app)
        .post("/api/users/login")
        .send({ email: "bademail@mail.com", password: "123456" });
      expect(res.status).toEqual(401);
      expect(res.body).toBeDefined();
      done();
    });
  });
  describe("POST /api/users/logout", () => {
    test("204 status for request POST: /api/users/logout", async (done) => {
      const res = await request(app)
        .post("/api/users/logout")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toEqual(204);
      expect(res.body).toBeDefined();
      done();
    });
  });
});
