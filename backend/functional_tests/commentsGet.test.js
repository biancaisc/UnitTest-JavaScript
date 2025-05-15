import request from 'supertest';
import express from 'express';
import commentsRouter from '../routes/comments.js';
import { db } from '../.config.js';

const app = express();
app.use(express.json());
app.use('/comments', commentsRouter);


jest.mock('../.config.js', () => ({
    db: {
        prepare: jest.fn()
    }
}));

describe('GET /comments/:id', () => {
    
    test('should return all comments', async () => {
        const mockComments = [
            { id: 1, user_id: 1, content: 'Comentariu 1', book_id: 1},
            { id: 2, user_id: 2, content: 'Comentariu 2', book_id: 1}
        ];
        db.prepare.mockReturnValueOnce({
            all: jest.fn().mockReturnValue(mockComments)
        });
        const response = await request(app)
        .get('/comments/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockComments);
    });

    test('should return 404 when there are no books', async () => {
        const mockComments = [];
        db.prepare.mockReturnValueOnce({
            all: jest.fn().mockReturnValue(mockComments)
        });
        const response = await request(app)
        .get('/comments/1');
        expect(response.status).toBe(404);
        expect(response.text).toEqual('No comments found for this book!');
    });

    test('should return 500 if there is an error', async () => {
        db.prepare.mockReturnValueOnce({
            all: jest.fn().mockImplementation(() => {
                throw new Error('Eroare');
            })
        });
        const response = await request(app)
        .get('/comments/1');
        expect(response.status).toBe(500);
        expect(response.text).toBe('Error fetching comments!');
    });
});