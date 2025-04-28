import request from 'supertest';
import express from 'express';
import commentsRouter from '../routes/comments.js';

const jwt = require('jsonwebtoken');
const secretKey = process.env.ACCESS_TOKEN_SECRET;

const app = express();
app.use(express.json());
app.use('/comments', commentsRouter);

describe('POST /', () => {

    const token = jwt.sign({ user: {id: 1, name: "nume", password: "parola"} }, secretKey, { expiresIn: '1h' });


    it('should return 400 if book_id and content are missing', async () => {
        const res = await request(app) 
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({})
        expect(res.status).toBe(400);
        expect(res.text).toBe('All fields are required!');
    });

    it('should return 400 if book_id is missing', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({content: "continut"})
        expect(res.status).toBe(400);
        expect(res.text).toBe('All fields are required!');
    });

    it('should return 400 if content is missing', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({book_id: 1})
        expect(res.status).toBe(400);
        expect(res.text).toBe('All fields are required!');
    })

    it('should return 400 if book_id is invalid -> not a number', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: "1", content: 'Valid comment' });
        expect(res.status).toBe(400);
        expect(res.text).toBe('Invalid book ID!');
    });

    it('should return 400 if book_id is invalid -> <=0', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: -1, content: 'Valid comment' });
        expect(res.status).toBe(400);
        expect(res.text).toBe('Invalid book ID!');
    });

    it('should return 400 if content is too short', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: 1, content: '123' });
        expect(res.status).toBe(400);
        expect(res.text).toBe('Content is too short!');
    });

    it('should return 400 if content is too long', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: 1, content: 'a'.repeat(501) });
        expect(res.status).toBe(400);
        expect(res.text).toBe('Content is too long!');
    });

    it('should return 201 if comment is added successfully', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: 7, content: 'This is a valid comment' });
        expect(res.status).toBe(201);
        expect(res.text).toBe('Comment added successfully!');
    });

    it('should return 500 if there is an error adding the comment', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: 1, content: 'This is a valid comment' });
        expect(res.status).toBe(500);
        expect(res.text).toBe('Error adding comment!');
    });
});
