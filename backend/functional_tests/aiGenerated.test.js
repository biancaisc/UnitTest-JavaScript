import request from 'supertest';
import app from '../app.js'; // actualizează calea în funcție de structura ta
import { jest } from '@jest/globals';

// Mock pentru middleware-ul verifyToken
jest.unstable_mockModule('../middleware/verifyToken.js', () => ({
  default: (req, res, next) => {
    req.user = { id: 1 }; // user mock
    next();
  }
}));

// Mock pentru baza de date
import * as dbModule from '../db.js';

describe('POST /comments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if book_id or content is missing', async () => {
    const res = await request(app).post('/').send({ content: 'valid content' });
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('All fields are required!');
  });

  it('should return 400 for invalid book_id', async () => {
    const res = await request(app).post('/').send({ book_id: -1, content: 'valid content' });
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('Invalid book ID!');
  });

  it('should return 400 if content is too short', async () => {
    const res = await request(app).post('/').send({ book_id: 1, content: '1234' });
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('Content is too short!');
  });

  it('should return 400 if content is too long', async () => {
    const longContent = 'a'.repeat(501);
    const res = await request(app).post('/').send({ book_id: 1, content: longContent });
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('Content is too long!');
  });

  it('should return 201 for a valid comment', async () => {
    const runMock = jest.fn();
    jest.spyOn(dbModule, 'default').mockReturnValue({
      prepare: () => ({
        run: runMock
      })
    });

    const res = await request(app).post('/').send({ book_id: 1, content: 'A valid comment' });
    expect(res.statusCode).toBe(201);
    expect(res.text).toBe('Comment added successfully!');
    expect(runMock).toHaveBeenCalledWith(1, 1, 'A valid comment');
  });

  it('should return 500 if db throws an error', async () => {
    jest.spyOn(dbModule, 'default').mockReturnValue({
      prepare: () => ({
        run: () => {
          throw new Error('DB error');
        }
      })
    });

    const res = await request(app).post('/').send({ book_id: 1, content: 'Valid again' });
    expect(res.statusCode).toBe(500);
    expect(res.text).toBe('Error adding comment!');
  });
});
