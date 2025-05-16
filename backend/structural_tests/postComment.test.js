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

    // TIPURI DE ACOPERIRE

    //1. Acoperire la nivel de instructiune
    //2. Acoperire la nivel de decizie
    //3. Acoperire la nivel de conditie
    //4. Acoperire la nivel de condiție/decizie


    //1. Acoperire la nivel de instructiune - instrucțiuni parcurse (1->2->3->4)
    //2. Acoperire la nivel de decizie (decizia 1 - ramura de true)
    //3. Acoperire la nivel de conditie
    //4. Acoperire la nivel de condiție/decizie
    it('should return 400 if book_id and content are missing', async () => {
        const res = await request(app) 
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({})
        expect(res.status).toBe(400);
        expect(res.text).toBe('All fields are required!');
    });

    //3. Acoperire la nivel de conditie
    //4. Acoperire la nivel de condiție/decizie
    it('should return 400 if book_id is missing', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({content: "continut"})
        expect(res.status).toBe(400);
        expect(res.text).toBe('All fields are required!');
    });

    //3. Acoperire la nivel de conditie
    //4. Acoperire la nivel de condiție/decizie
    it('should return 400 if content is missing', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({book_id: 1})
        expect(res.status).toBe(400);
        expect(res.text).toBe('All fields are required!');
    })

    //2. Acoperire la nivel de decizie (decizia 1 - ramura de false; decizia 2 ramura de true)
    //3. Acoperire la nivel de conditie
    //4. Acoperire la nivel de condiție/decizie
    it('should return 400 if book_id is invalid -> not a number', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: "1", content: 'Valid comment' });
        expect(res.status).toBe(400);
        expect(res.text).toBe('Invalid book ID!');
    });

    //1. Acoperire la nivel de instructiune - instructiuni parcurse (1-2 → 3 -> 5 -> 6)
    //3. Acoperire la nivel de conditie
    //4. Acoperire la nivel de condiție/decizie
    it('should return 400 if book_id is invalid -> <=0', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: -1, content: 'Valid comment' });
        expect(res.status).toBe(400);
        expect(res.text).toBe('Invalid book ID!');
    });

    //1. Acoperire la nivel de instructiune - instructiuni parcurse (1-2 → 3 -> 5 -> 7 -> 8)
    //3. Acoperire la nivel de conditie
    //4. Acoperire la nivel de condiție/decizie
    it('should return 400 if content is too short', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: 1, content: '123' });
        expect(res.status).toBe(400);
        expect(res.text).toBe('Content is too short!');
    });

    //1. Acoperire la nivel de instructiune - instructiuni parcurse (1-2 → 3 -> 5 -> 7 -> 9 -> 10)
    //2. Acoperire la nivel de decizie (decizia 1 - ramura de false; decizia 2 ramura de false; decizia 3 ramura de false; decizia 4 ramura de true)
    //3. Acoperire la nivel de conditie
    //4. Acoperire la nivel de condiție/decizie
    it('should return 400 if content is too long', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: 1, content: 'a'.repeat(501) });
        expect(res.status).toBe(400);
        expect(res.text).toBe('Content is too long!');
    });

    //1. Acoperire la nivel de instructiune - instructiuni parcurse (1-2 → 3 -> 5 -> 7 -> 9 -> 11 -> 12 -> 13-14)
    //2. Acoperire la nivel de decizie (decizia 1 - ramura de false; decizia 2 ramura de false; decizia 3 ramura de false; decizia 4 ramura de false; try accepted)
    //3. Acoperire la nivel de conditie
    //4. Acoperire la nivel de condiție/decizie
    it('should return 201 if comment is added successfully', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: 7, content: 'This is a valid comment' });
        expect(res.status).toBe(201);
        expect(res.text).toBe('Comment added successfully!');
    });

    //1. Acoperire la nivel de instructiune - instructiuni parcurse (1-2 → 3 -> 5 -> 7 -> 9 -> 11 -> 12 -> 15 -> 16-17)
    //2. Acoperire la nivel de decizie (decizia 1 - ramura de false; decizia 2 ramura de false; decizia 3 ramura de false; decizia 4 ramura de false; try rejected => catch)
    //3. Acoperire la nivel de conditie
    //4. Acoperire la nivel de condiție/decizie
    it('should return 500 if there is an error adding the comment', async () => {
        const res = await request(app)
            .post('/comments/')
            .set('Authorization', `Bearer ${token}`)
            .send({ book_id: 1, content: 'This is a valid comment' });
        expect(res.status).toBe(500);
        expect(res.text).toBe('Error adding comment!');
    });
});
