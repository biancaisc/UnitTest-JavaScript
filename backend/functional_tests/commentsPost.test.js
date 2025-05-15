import request from 'supertest';
import express from 'express';
import commentsRouter from '../routes/comments.js';
import { db } from '../.config.js';

const app = express();
app.use(express.json());
app.use('/comments', commentsRouter);

jest.mock('../routes/authentification.js', () => ({
    verifyToken: (req,res,next) => {
        req.user = { id: 1};
        next();
    }
}));

jest.mock('../.config.js', () => ({
    db: {
        prepare: jest.fn()
    }
}));

describe('POST /comments', () => {


    //1. Clase de echivalenta

    test('should add a new comment', async() => {
        const newComment = { book_id: 1, content: "continut"};
        db.prepare.mockReturnValueOnce({
            run: jest.fn()
        });
        const response = await request(app)
        .post('/comments')
        .send(newComment);
        expect(response.status).toBe(201);
        expect(response.text).toBe('Comment added successfully!');
    });

    //1. Clase de echivalenta
    test('should return status code 400 when there is no book id', async() => {
        const newComment = { book_id: null, content: "continut"};
        db.prepare.mockReturnValueOnce({
            run:jest.fn()
        });
        const response = await request(app)
        .post('/comments')
        .send(newComment);
        expect(response.status).toBe(400);
        expect(response.text).toBe('All fields are required!');
    });

    //1. Clase de echivalenta
    test('should return status code 400 when there is no content', async() => {
        const newComment = { book_id: 1, content: null};
        db.prepare.mockReturnValueOnce({
            run:jest.fn()
        });
        const response = await request(app)
        .post('/comments')
        .send(newComment);
        expect(response.status).toBe(400);
        expect(response.text).toBe('All fields are required!');
    });

    //1. Clase de echivalenta
    //2. Valori de frontiera
    test('should return status code 400 when content is too short', async() => {
        const newComment = { book_id: 1, content: 'ab'};
        db.prepare.mockReturnValueOnce({
            run:jest.fn()
        });
        const response = await request(app)
        .post('/comments')
        .send(newComment);
        expect(response.status).toBe(400);
        expect(response.text).toBe('Content is too short!');
    });

    //1. Clase de echivalenta
    //2. Valori de frontiera
    test('should return status code 400 when content is too long', async() => {
        const newComment = { book_id: 1, content: 'a'.repeat(501)};
        db.prepare.mockReturnValueOnce({
            run:jest.fn()
        });
        const response = await request(app)
        .post('/comments')
        .send(newComment);
        expect(response.status).toBe(400);
        expect(response.text).toBe('Content is too long!');
    });

    //1. Clase de echivalenta
    test('should return status code 400 when book_id is not a number', async() => {
        const newComment = { book_id: "idInvalid", content: 'continut'};
        db.prepare.mockReturnValueOnce({
            run: jest.fn()
        });
        const response = await request(app)
        .post('/comments')
        .send(newComment);
        expect(response.status).toBe(400);
        expect(response.text).toBe('Invalid book ID!');
    });

    //1. Clase de echivalenta
    //2. Valori de frontiera
    test('should return status code 400 when book_id <= 0', async() => {
        const newComment = { book_id: -1, content: 'continut'};
        db.prepare.mockReturnValueOnce({
            run: jest.fn()
        });
        const response = await request(app)
        .post('/comments')
        .send(newComment);
        expect(response.status).toBe(400);
        expect(response.text).toBe('Invalid book ID!')
    });

});

