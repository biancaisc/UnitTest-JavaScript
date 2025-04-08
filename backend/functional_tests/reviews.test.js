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

  test('should return 400 because rating > 5', async() =>{
    const newReview = {book_id: 1, rating: 6}; 

    const response = await request(app)
    .post('/reviews')
    .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Rating must be a number between 1 and 5.');
  });

  
  test('should return 400 because rating < 1', async()=>{
    const newReview = {book_id: 1, rating: -1}; 

    const response = await request(app)
      .post('/reviews')
      .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('Rating must be a number between 1 and 5.');
  });

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


  test('should return 400 because book_id is null', async()=> {
    const newReview = { rating: 5 }; 

    const response = await request(app)
      .post('/reviews')
      .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('All fields are required!');
    });

  test('should return 400 because rating < 1 and book_id is null', async()=>{
    const newReview = {rating: -1}; 
    const response = await request(app)
      .post('/reviews')
      .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('All fields are required!');
  });

  test('should return 400 because rating > 5 and book_id is null', async ()=>{
    const newReview = { rating: 6}; 

    const response = await request(app)
      .post('/reviews')
      .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('All fields are required!');
  });

  test('should return 400 because review is null', async () =>{
    const newReview = {book_id: 1 }; 

    const response = await request(app)
      .post('/reviews')
      .send(newReview);

    expect(response.status).toBe(400);
    expect(response.text).toBe('All fields are required!');
  });



});