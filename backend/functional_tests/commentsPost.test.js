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
});

