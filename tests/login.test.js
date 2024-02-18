import request from "supertest";
import { app } from "../app.js";
import { connectDB } from "../config/connectDB.js";

const ENDPOINT = "/users/login";
const TEST_USER = {
  email: "vakidaj373@tospage.com",
  password: "12345",
};

describe("test login controller", () => {
  beforeAll(async () => {
    await connectDB();
  });

  test("login controller returns status code 200", async () => {
    const response = await request(app).post(ENDPOINT).send(TEST_USER);
    expect(response.status).toBe(200);
  });

  test("login controller returns token", async () => {
    const response = await request(app).post(ENDPOINT).send(TEST_USER);
    expect(response.body.token).toBeDefined();
  });

  test("login controller returns object user with 2 fields: email and subscription", async () => {
    const response = await request(app).post(ENDPOINT).send(TEST_USER);

    expect(response).toBeDefined();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});
