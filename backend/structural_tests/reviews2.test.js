import request from 'supertest';
import express from 'express';
import reviewsRouter from '../routes/reviews.js';
import { db } from '../.config.js';

jest.mock('../routes/authentification.js', () => ({
  verifyToken: (req, res, next) => {
    req.user = { id: 1 };
    next();
  }
}));
jest.mock('../.config.js', () => ({
  db: {
    prepare: jest.fn()
  }
}));

const app = express();
app.use(express.json());
app.use('/reviews', reviewsRouter);

describe('POST /reviews', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return 400 if book_id is missing', async () => {
    const response = await request(app)
      .post('/reviews')
      .send({ rating: 4 }); // no book_id

    expect(response.status).toBe(400);
    expect(response.text).toBe('All fields are required!');
  });

  test('should return 400 if rating is missing', async () => {
    const response = await request(app)
      .post('/reviews')
      .send({ book_id: 10 }); // no rating

    expect(response.status).toBe(400);
    expect(response.text).toBe('All fields are required!');
  });
  test('should return 400 if both rating and book_id is missing', async () => {
    const response = await request(app)
      .post('/reviews')
      .send({});

    expect(response.status).toBe(400);
    expect(response.text).toBe('All fields are required!');
  });

  test('should return 400 if rating is not a number', async () => {
    const response = await request(app)
      .post('/reviews')
      .send({ book_id: 10, rating: 'abc' }); // rating not number

    expect(response.status).toBe(400);
    expect(response.text).toBe('Rating must be a number between 1 and 5.');
  });

  test('should return 400 if rating is less than 1', async () => {
    const response = await request(app)
      .post('/reviews')
      .send({ book_id: 10, rating: -1 });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Rating must be a number between 1 and 5.');
  });

  test('should return 400 if rating is greater than 5', async () => {
    const response = await request(app)
      .post('/reviews')
      .send({ book_id: 10, rating: 6 });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Rating must be a number between 1 and 5.');
  });

  test('should return 400 if user already reviewed the book', async () => {
    db.prepare.mockImplementation((query) => {
      if (query.includes('SELECT')) {
        return {
          get: jest.fn().mockReturnValue({ id: 1 }) // fake existing review
        };
      }
    });

    const response = await request(app)
      .post('/reviews')
      .send({ book_id: 10, rating: 4 });

    expect(response.status).toBe(400);
    expect(response.text).toBe('You have already added a review for this book.');
  });

  test('should insert review and return 201 if no duplicate exists', async () => {
    db.prepare.mockImplementation((query) => {
      if (query.includes('SELECT')) {
        return {
          get: jest.fn().mockReturnValue(undefined) // no existing review
        };
      } else if (query.includes('INSERT')) {
        return {
          run: jest.fn()
        };
      }
    });

    const response = await request(app)
      .post('/reviews')
      .send({ book_id: 10, rating: 1 });

    expect(response.status).toBe(201);
    expect(response.text).toBe('Review added successfully!');
  });

  test('should return 500 if database throws error', async () => {
    db.prepare.mockImplementation(() => {
      throw new Error('Database error');
    });

    const response = await request(app)
      .post('/reviews')
      .send({ book_id: 10, rating: 4 });

    expect(response.status).toBe(500);
    expect(response.text).toBe('Error adding review!');
  });
});
