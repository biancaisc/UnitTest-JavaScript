import request from 'supertest';
import express from 'express';
import libraryRouter from '../routes/library.js';
import { db } from '../.config.js';

jest.mock('../.config.js', () => ({
    db: {
        prepare: jest.fn()
    }
}));

const app = express();
app.use(express.json());
app.use("/", libraryRouter);

describe("GET /id/:user_id - Functional testing", () => {

    describe('1. Equivalence Partitioning Tests', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        test('valid user_id and valid book_id → should return 200 + associated book', async () => {
            const bookMoked = jest.fn().mockReturnValue({
                user_id: 10,
                book_id: 4,
                readit: true
            });
            db.prepare.mockReturnValue({ get: bookMoked });

            const response = await request(app).get('/10/4');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                user_id: 10,
                book_id: 4,
                readit: true
            });
        });

        test('valid user_id and valid book_id but non-existent book → should return 404"', async () => {
            const bookMoked = jest.fn()
                .mockReturnValueOnce(null)
                .mockReturnValueOnce({ user_id: 5 });
            db.prepare.mockReturnValue({ get: bookMoked });

            const response = await request(app).get('/5/3');
            
            expect(response.status).toBe(404);
            expect(response.text).toBe("The book is not in your library.");
            expect(db.prepare).toHaveBeenCalledTimes(2);
        });

        test('valid user_id and valid book_id but non-existent user → should return 404"', async () => {
            const bookMoked = jest.fn().mockReturnValue(null);
            db.prepare.mockReturnValue({ get: bookMoked });

            const response = await request(app).get('/6/10');
            
            expect(response.status).toBe(404);
            expect(response.text).toBe("The user does not exist.");
            expect(db.prepare).toHaveBeenCalledTimes(2);
        });

        test('invalid user_id and valid book_id  → should return 400"', async () => {
            const response = await request(app).get('/user1/100');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
            expect(db.prepare).not.toHaveBeenCalled();
        });

        test('valid user_id and invalid book_id  → should return 400"', async () => {
            const response = await request(app).get('/50/book1');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
            expect(db.prepare).not.toHaveBeenCalled();
        });

        test('invalid user_id and invalid book_id  → should return 400"', async () => {
            const response = await request(app).get('/user2/book2');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
            expect(db.prepare).not.toHaveBeenCalled();
        });
    });

    describe('2. Boundary Value Analysis Tests', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
    
        test('minimum valid user_id = 1 and valid book_id= → should return 200 + associated book', async () => {
            const bookMoked = jest.fn().mockReturnValue({
                user_id: 1,
                book_id: 10,
                readit: false
            });
            db.prepare.mockReturnValue({ get: bookMoked });

            const response = await request(app).get('/1/10');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                user_id: 1,
                book_id: 10,
                readit: false
            });
        });

        test('valid user_id and minimum valid book_id = 1 → should return 200 + associated book', async () => {
            const mockGet = jest.fn().mockReturnValue({
                user_id: 5,
                book_id: 1,
                readit: true
            });
            db.prepare.mockReturnValue({ get: mockGet });

            const response = await request(app).get('/5/1');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                user_id: 5,
                book_id: 1,
                readit: true
            });
        });

        test('maximum user_id = 100000 and valid book_id → should return 200 + associated book', async () => {
            const bookMoked = jest.fn().mockReturnValue({
                user_id: 100000,
                book_id: 10,
                readit: false
            });
            db.prepare.mockReturnValue({ get: bookMoked });

            const response = await request(app).get('/100000/10');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                user_id: 100000,
                book_id: 10,
                readit: false
            });
        });

        test('valid user_id and maximum book_id = 100000 → should 200 + associated book', async () => {
            const bookMoked = jest.fn().mockReturnValue({
                user_id: 5,
                book_id: 100000,
                readit: true
            });
            db.prepare.mockReturnValue({ get: bookMoked });

            const response = await request(app).get('/5/100000');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                user_id: 5,
                book_id: 100000,
                readit: true
            });
        });

        test('user_id = 0 and valid book_id → 200 + associated book', async () => {
            const bookMoked = jest.fn().mockReturnValue({
                user_id: 0,
                book_id: 4,
                readit: false
            });
            db.prepare.mockReturnValue({ get: bookMoked });

            const response = await request(app).get('/0/4');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                user_id: 0,
                book_id: 4,
                readit: false
            });
        });

        test('valid user_id and book_id = 0 → 200 + associated book', async () => {
            const bookMoked = jest.fn().mockReturnValue({
                user_id: 5,
                book_id: 0,
                readit: true
            });
            db.prepare.mockReturnValue({ get: bookMoked });

            const response = await request(app).get('/5/0');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                user_id: 5,
                book_id: 0,
                readit: true
            });
        });

        test('negative user_id and valid book_id → 200 + associated book', async () => {
            const bookMoked = jest.fn().mockReturnValue({
                user_id: -1,
                book_id: 10,
                readit: false
            });
            db.prepare.mockReturnValue({ get: bookMoked });
            
            const response = await request(app).get('/-1/10');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                user_id: -1,
                book_id: 10,
                readit: false
            });
        });

        test('valid user_id and negative book_id → 200 + associated book', async () => {
            const bookMoked = jest.fn().mockReturnValue({
                user_id: 5,
                book_id: -10,
                readit: true
            });
            db.prepare.mockReturnValue({ get: bookMoked });
            
            const response = await request(app).get('/5/-10');
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                user_id: 5,
                book_id: -10,
                readit: true
            });
        });

        test('empty user_id and valid book_id → 400', async () => {
            const response = await request(app).get('/%20/5');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
        });

        test('valid user_id and empty book_id → 400', async () => {
            const response = await request(app).get('/10/%20');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
        });
    });

    describe('3. Category Partitioning Tests', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        
        test('valid user_id + valid book_id + book found → 200 + associated book', async () => {
            const bookMoked = jest.fn().mockReturnValue({
                user_id: 123,
                book_id: 10,
                readit: true
            });
            db.prepare.mockReturnValue({ get: bookMoked });

            const response = await request(app).get('/123/10');
            
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                user_id: 123,
                book_id: 10,
                readit: true
            });
        });

        test('valid user_id + valid book_id + book not found but user exists → 404', async () => {
            const bookMoked = jest.fn()
                .mockReturnValueOnce(null)
                .mockReturnValueOnce({ user_id: 10 });
            db.prepare.mockReturnValue({ get: bookMoked });

            const response = await request(app).get('/10/10');
            
            expect(response.status).toBe(404);
            expect(response.text).toBe("The book is not in your library.");
        });

        test('valid user_id + valid book_id + book not found and user doesn\'t exist → 404', async () => {
            const bookMoked = jest.fn().mockReturnValue(null);
            db.prepare.mockReturnValue({ get: bookMoked });

            const response = await request(app).get('/15/20');
            
            expect(response.status).toBe(404);
            expect(response.text).toBe("The user does not exist.");
        });

        test('invalid user_id + valid book_id → 400', async () => {
            const response = await request(app).get('/abc1-invalid/5');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
        });

        test('valid user_id + invalid book_id → 400', async () => {
            const response = await request(app).get('/30/book123');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
        });

        test('empty user_id + invalid book_id → 400', async () => {
            const response = await request(app).get('/ /a-1-2');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
        });

        test('valid user_id + valid book_id + database error → 500"', async () => {
            db.prepare.mockImplementation(() => {
                throw new Error('Database error');
            });

            const response = await request(app).get('/100/101');
            
            expect(response.status).toBe(500);
            expect(response.text).toBe("There is an error processing your request.");
        });
    });
});