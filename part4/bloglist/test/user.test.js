const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({
    username: "root",
    passwordHash,
    blogs: "5a422a851b54a676234d17f7",
  });
  await user.save();
});

describe("invalid user creation", () => {
  test("should return 400 if username or password is missing", async () => {
    const newUser = {
      username: "testuser",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    assert.strictEqual(
      response.body.error,
      "Please provide username and password"
    );
  });

  test("should return 400 if username or password is less than 4 characters", async () => {
    const newUser = {
      username: "us",
      password: "pw",
    };

    const response = await api.post("/api/users").send(newUser).expect(400);
    assert.strictEqual(
      response.body.error,
      "Username and Password must have more than 3 characters"
    );
  });

  test("should successfully create user when valid data is provided", async () => {
    const newUser = {
      username: "validUser",
      password: "validPassword123",
    };

    const response = await api.post("/api/users").send(newUser).expect(201);
    assert(response.body.username === newUser.username);
  });
});

after(async () => {
  await mongoose.connection.close();
});
