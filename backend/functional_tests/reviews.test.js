import request from 'supertest';
import express from 'express';
import reviewsRouter from '../routes/reviews.js';
import { db } from '../.config.js';

jest.mock('../routes/authentification.js', () =>({
  verifyToken: (req, res, next) =>{
    req.user = { id: 1 }; 
    next();
  }
}));
jest.mock('../.config.js', ()=>({
  db: {
    prepare: jest.fn()
  }
}));

const app = express();
app.use(express.json());
app.use('/reviews', reviewsRouter);

describe('POST /reviews', () => {

  // clasa valida: rating între 1 si 5 (R_valid), book_id valid (B_present)
  // valoare de frontiera - limita superioara
  // C₁₁
  test('should add a review', async()=>{
    const newReview = { book_id: 1, rating: 5 };

    db.prepare.mockReturnValueOnce({
      get: jest.fn().mockReturnValue(null) 
    });

    db.prepare.mockReturnValueOnce( {
      run: jest.fn()
    });

    const response = await request(app)
    .post('/reviews')
    .send(newReview);

     expect(response.status).toBe(201);
     expect(response.text).toBe('Review added successfully!');
 });

  // valoare de frontiera: limita inferioara
  test('should add a review', async()=>{
    const newReview = { book_id: 1, rating: 1 };

    db.prepare.mockReturnValueOnce({
      get: jest.fn().mockReturnValue(null) 
    });

    db.prepare.mockReturnValueOnce( {
      run: jest.fn()
    });

    const response = await request(app)
    .post('/reviews')
    .send(newReview);

    expect(response.status).toBe(201);
    expect(response.text).toBe('Review added successfully!');
  });

  // clasa invalida: rating > 5 (R_gt_5)
  // valoare de frontiera - imediat peste limita superioara (5)
  // C₁₂
  test('should return 400 because rating > 5', async() =>{
    const newReview = {book_id: 1, rating: 6}; 

    const response = await request(app)
    .post('/reviews')
    .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Rating must be a number between 1 and 5.');
  });

  // clasa invalida: rating < 1  (R_lt_1)
  // valoare de frontiera - peste limita inferioara(-1), dar != 0 pt a nu fi considerat null
  // C₁₃
  test('should return 400 because rating < 1', async()=>{
    const newReview = {book_id: 1, rating: -1}; 

    const response = await request(app)
      .post('/reviews')
      .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Rating must be a number between 1 and 5.');
  });

  //C₁₄
  test('should return 400 because review already exists', async() => {
    const newReview = {book_id: 1, rating: 5};

    db.prepare.mockReturnValueOnce ({
      get: jest.fn().mockReturnValue({user_id: 1, book_id: 1, rating: 5})
    });

    const response = await request(app)
      .post('/reviews')
      .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('You have already added a review for this book.' );

   });

  //C₁₅
  test('should return 400 because rating < 1 and book_id is null', async()=>{
    const newReview = {rating: -1}; 
    const response = await request(app)
        .post('/reviews')
        .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('All fields are required!');
  });

  // C₁₆
  test('should return 400 because rating > 5 and book_id is null', async ()=>{
      const newReview = { rating: 6}; 
  
      const response = await request(app)
        .post('/reviews')
        .send(newReview);
  
      expect(response.status).toBe(400);
      expect(response.text).toBe('All fields are required!');
  });

  // clasa invalida: book_id is null (B_null)
  // C₁₇
  test('should return 400 because book_id is null', async()=> {
    const newReview = { rating: 5 }; 

    const response = await request(app)
      .post('/reviews')
      .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('All fields are required!');
  });

  // clasa invalida: review is null (R_null)
  // C₁₈
  test('should return 400 because review is null', async() =>{
    const newReview = {book_id: 1 }; 

    const response = await request(app)
      .post('/reviews')
      .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('All fields are required!');
  });



});
