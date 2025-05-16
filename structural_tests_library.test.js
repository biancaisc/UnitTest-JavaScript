import request from 'supertest';
import express from 'express';
import libraryRouter from '../routes/library.js';

// Mock pentru baza de date
jest.mock('../.config.js', () => {
  return {
    db: {
      prepare: jest.fn()
    }
  };
});

import { db } from '../.config.js';

const app = express();
app.use("/", libraryRouter);

describe("GET /:user_id/:book_id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test 1 - user_id gol (invalid)
  it("should return 400 if user_id is empty", async () => {
    const res = await request(app).get("/ /2");
    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid user id or book id provided.");
  });

  // ✅ Test 2 - user_id NaN
  it("should return 400 if user_id is not a number", async () => {
    const res = await request(app).get("/abc/2");
    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid user id or book id provided.");
  });

  // ✅ Test 3 - book_id NaN
  it("should return 400 if book_id is not a number", async () => {
    const res = await request(app).get("/1/xyz");
    expect(res.status).toBe(400);
    expect(res.text).toBe("Invalid user id or book id provided.");
  });

  // ✅ Test 4 - carte găsită
  it("should return 200 if book is found", async () => {
    const mockBook = { user_id: 1, book_id: 2, title: "Test Book" };
    db.prepare.mockReturnValueOnce({
      get: jest.fn().mockReturnValue(mockBook),
    });

    const res = await request(app).get("/1/2");
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockBook);
  });

  // ✅ Test 5 - carte lipsă, dar user există
  it("should return 404 if book not found but user exists", async () => {
    db.prepare
      .mockReturnValueOnce({ get: jest.fn().mockReturnValue(undefined) }) // carte lipsă
      .mockReturnValueOnce({ get: jest.fn().mockReturnValue({ user_id: 1 }) }); // user ok

    const res = await request(app).get("/1/2");
    expect(res.status).toBe(404);
    expect(res.text).toBe("The book is not in your library.");
  });

  // ✅ Test 6 - carte lipsă, user inexistent
  it("should return 404 if user does not exist", async () => {
    db.prepare
      .mockReturnValueOnce({ get: jest.fn().mockReturnValue(undefined) }) // carte lipsă
      .mockReturnValueOnce({ get: jest.fn().mockReturnValue(undefined) }); // user lipsă

    const res = await request(app).get("/1/2");
    expect(res.status).toBe(404);
    expect(res.text).toBe("The user does not exist.");
  });

  // ✅ Test 7 - eroare internă
  it("should return 500 if an exception is thrown", async () => {
    db.prepare.mockImplementation(() => {
      throw new Error("DB crashed");
    });

    const res = await request(app).get("/1/2");
    expect(res.status).toBe(500);
    expect(res.text).toBe("There is an error processing your request.");
  });
});
