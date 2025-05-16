import request from 'supertest';
import express from 'express';
import reviewRouter from '../routes/reviews.js';
import { db } from '../.config.js';
import { verifyToken } from '../routes/authentification.js';

// Mock database și autentificare
jest.mock('../.config.js', () => ({
  db: {
    prepare: jest.fn(),
  },
}));

jest.mock('../routes/authentification.js', () => ({
  verifyToken: (req, res, next) => {
    req.user = { id: 1 }; // mock user
    next();
  },
}));

const app = express();
app.use(express.json());
app.use('/reviews', reviewRouter);

describe('POST /reviews', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('✅ should add review successfully', async () => {
    db.prepare.mockImplementation((sql) => {
      if (sql.includes('SELECT')) {
        return { get: () => null }; // no existing review
      }
      if (sql.includes('INSERT')) {
        return { run: jest.fn() };
      }
    });

    const response = await request(app)
      .post('/reviews')
      .send({ book_id: 10, rating: 4 });

    expect(response.status).toBe(201);
    expect(response.text).toBe('Review added successfully!');
  });

  test('❌ should return 400 if fields are missing', async () => {
    const response = await request(app).post('/reviews').send({ rating: 4 });
    expect(response.status).toBe(400);
    expect(response.text).toBe('All fields are required!');
  });

  test('❌ should return 400 if rating is invalid', async () => {
    const response = await request(app).post('/reviews').send({ book_id: 5, rating: 7 });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Rating must be a number between 1 and 5.');
  });

  test('❌ should return 400 if review already exists', async () => {
    db.prepare.mockImplementation((sql) => {
      if (sql.includes('SELECT')) {
        return { get: () => ({ id: 1 }) }; // review already exists
      }
    });

    const response = await request(app)
      .post('/reviews')
      .send({ book_id: 10, rating: 4 });

    expect(response.status).toBe(400);
    expect(response.text).toBe('You have already added a review for this book.');
  });

  test('❌ should return 500 if database error occurs', async () => {
    db.prepare.mockImplementation(() => {
      throw new Error('DB crash');
    });

    const response = await request(app)
      .post('/reviews')
      .send({ book_id: 1, rating: 3 });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Error adding review!');
  });
});
