const guard = require("../helpers/guard");
const passport = require("passport");
const { HTTP_CODE } = require("../helpers/constants");
const { User } = require("../model/__mocks__/data");

describe("Unit test: helpers/guard", () => {
  const req = { get: jest.fn((header) => `Bearer ${User.token}`), user: User };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((response) => response),
  };
  const next = jest.fn();
  test("run function in case of Authorization header is absent", () => {
    passport.authenticate = jest.fn(
      (authType, options, callback) => (req, res, next) => {
        callback(null, false);
      }
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      Status: `${HTTP_CODE.UNAUTHORIZED} Unauthorized`,
      ResponseBody: {
        message: "Not authorized",
      },
    });
  });
  test("run function in case of right Authorization header", () => {
    passport.authenticate = jest.fn(
      (authType, options, callback) => (req, res, next) => {
        callback(null, User);
      }
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
  test("run function in case of wrong Authorization header", () => {
    passport.authenticate = jest.fn(
      (authType, options, callback) => (req, res, next) => {
        callback(null, { token: null });
      }
    );
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      Status: `${HTTP_CODE.UNAUTHORIZED} Unauthorized`,
      ResponseBody: {
        message: "Not authorized",
      },
    });
  });
});
