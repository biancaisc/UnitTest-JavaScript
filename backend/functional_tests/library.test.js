import request from 'supertest';
import express from 'express';
import libraryRouter from '../routes/library.js';
import { db } from '../.config.js';

jest.mock('../.config.js', () => ({
    db: {
        prepare: jest.fn().mockReturnThis(),
        get: jest.fn()
    }
}));

const app = express();
app.use(express.json());
app.use("/", libraryRouter);

describe("GET /:user_id/:book_id - Functional testing", () => {

    describe('1. Equivalence Partitioning Tests', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
    
        test('valid user_id and book_id, book exists -> should return 200 with the book', async () => {
            db.prepare.mockReturnThis();
            db.get.mockReturnValue({ id: 1, title: 'Test Book' });
            
            const response = await request(app).get('/123/1');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, title: 'Test Book' });
        });
    
        test('valid user_id and book_id, user exists but book not found -> should return 404', async () => {
            db.get.mockReturnValueOnce(null)  
                .mockReturnValueOnce({ id: 1 }); 
            
            const response = await request(app).get('/1/1');
            
            expect(response.status).toBe(404);
            expect(response.text).toBe('The book is not in your library.');
        });
    
        test('valid user_id and book_id, user does not exist -> should return 404', async () => {
            db.get.mockReturnValueOnce(null) 
                .mockReturnValueOnce(null); 
            
            const response = await request(app).get('/10/2');
            
            expect(response.status).toBe(404);
            expect(response.text).toBe('The user does not exist.');
        });
    
        test('invalid user_id -> should return 400', async () => {
            const response = await request(app).get('/ /2');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid user id or book id provided.');
        });
    
        test('invalid book_id -> should return 400', async () => {
            const response = await request(app).get('/1/ ');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid user id or book id provided.');
        });

        test('invalid user_id and book_id -> should return 400', async () => {
            const response = await request(app).get('/ / ');   

            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid user id or book id provided.');
        });
    });

    describe('2. Boundary Value Analysis Tests', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
    
        test('empty string user_id -> should return 400', async () => {
            const response = await request(app).get('/ /3');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid user id or book id provided.');
        });
    
        test('empty string book_id -> should return 400', async () => {
            const response = await request(app).get('/4/');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid user id or book id provided.');
        });
    
        test('whitespace only user_id -> should return 400', async () => {
            const response = await request(app).get('/ /5');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid user id or book id provided.');
        });
    
        test('whitespace only book_id -> should return 400', async () => {
            const response = await request(app).get('/11/ ');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid user id or book id provided.');
        });
    
        test('very long user_id -> should return 200 with book', async () => {
            db.get.mockReturnValue({ id: 1, title: 'Test Book' });
            
            const longId = '1'.repeat(10000);
            const response = await request(app).get(`/${longId}/1`);
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, title: 'Test Book' });
        });
    
        test('very long book_id -> should return 200 with book', async () => {
            db.get.mockReturnValue({ id: 1, title: 'Test Book' });
            
            const longId = '1'.repeat(10000);
            const response = await request(app).get(`/123/${longId}`);
            
            expect(response.status).toBe(400);
            expect(response.body).toEqual({ id: 1, title: 'Test Book' });
        });
    
        test('Special characters in user_id -> should return 200 with book', async () => {
            db.get.mockReturnValue({ id: 1, title: 'Test Book' });
            
            const response = await request(app).get('/user!@#$/456');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, title: 'Test Book' });
        });
    
        test('Special characters in book_id -> should return 200 with book', async () => {
            db.get.mockReturnValue({ id: 1, title: 'Test Book' });
            
            const response = await request(app).get('/123/book!@#$');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, title: 'Test Book' });
        });

        test('Negative number user_id -> should return 200 with book', async () => {
            db.get.mockReturnValue({ id: 1, title: 'Test Book' });
            
            const response = await request(app).get('/-123/456');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, title: 'Test Book' });
        });

        test('Negative number book_id -> should return 200 with book', async () => {
            db.get.mockReturnValue({ id: 1, title: 'Test Book' });
            
            const response = await request(app).get('/123/-456');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, title: 'Test Book' });
        });
    });

    describe('3. Category Partitioning Tests', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
        
        // Valid user_id + Valid book_id + Book found
        test('Valid user_id, valid book_id, book found -> should return 200 with book', async () => {
            db.get.mockReturnValue({ id: 1, title: 'Test Book' });
            
            const response = await request(app).get('/123/456');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, title: 'Test Book' });
        });
    
        // Valid user_id + Valid book_id + Book not found, user exists
        test('Valid user_id, valid book_id, book not found but user exists -> should return 404', async () => {
            db.get.mockReturnValueOnce(null)
                .mockReturnValueOnce({ id: 1 });
            
            const response = await request(app).get('/123/456');
            
            expect(response.status).toBe(404);
            expect(response.text).toBe('The book is not in your library.');
        });
    
        // Valid user_id + Valid book_id + Book not found, user doesn't exist
        test('Valid user_id, valid book_id, user does not exist -> should return 404', async () => {
            db.get.mockReturnValueOnce(null)
                .mockReturnValueOnce(null);
            
            const response = await request(app).get('/123/456');
            
            expect(response.status).toBe(404);
            expect(response.text).toBe('The user does not exist.');
        });
    
        // Valid user_id + Valid book_id + Database error
        test('Valid user_id, valid book_id, database error -> should return 500', async () => {
            db.get.mockImplementation(() => { 
                throw new Error('Database error'); 
            });
            
            const response = await request(app).get('/123/456');
            
            expect(response.status).toBe(500);
            expect(response.text).toBe('There is an error processing your request.');
        });
    
        // Valid user_id + Empty book_id
        test('Valid user_id, empty book_id -> should return 400', async () => {
            const response = await request(app).get('/123/');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid user id or book id provided.');
        });
    
        // Empty user_id + Valid book_id
        test('Empty user_id, valid book_id -> should return 400', async () => {
            const response = await request(app).get('/ /456');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid user id or book id provided.');
        });
    
        // Whitespace user_id + Valid book_id
        test('Whitespace user_id, valid book_id -> should return 400', async () => {
            const response = await request(app).get('/%20/456');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid user id or book id provided.');
        });
    
        // Valid user_id + Whitespace book_id
        test('Valid user_id, whitespace book_id -> should return 400', async () => {
            const response = await request(app).get('/123/%20');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe('Invalid user id or book id provided.');
        });
    
        // Numeric user_id + Numeric book_id
        test('Numeric user_id, numeric book_id, book found -> should return 200 with book', async () => {
            db.get.mockReturnValue({ id: 1, title: 'Test Book' });
            
            const response = await request(app).get('/123/456');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, title: 'Test Book' });
        });
    
        // Alphanumeric user_id + Alphanumeric book_id
        test('Alphanumeric user_id, alphanumeric book_id, book found -> should return 200 with book', async () => {
            db.get.mockReturnValue({ id: 1, title: 'Test Book' });
            
            const response = await request(app).get('/user123/book456');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: 1, title: 'Test Book' });
        });

        // Negative user_id + Negative book_id
        test('Negative user_id, negative book_id, book found -> should return 200 with book', async () => {
            db.get.mockReturnValue({ id: -456, title: 'Test Book' });
            
            const response = await request(app).get('/-123/-456');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({ id: -456, title: 'Test Book' });
        });
    });
});