import request from 'supertest';
import express from 'express';
import { db } from '../.config.js'; // acesta va fi mock-uit
import router from '../routes//library.js'; // înlocuiește cu path-ul real

jest.mock('../.config.js', () => {
    const mockPrepare = jest.fn();
    return {
        db: {
            prepare: mockPrepare
        }
    };
});

describe('GET /:user_id/:book_id', () => {
    const app = express();
    app.use('/', router);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 for invalid input', async () => {
        const res = await request(app).get('/   /xyz');
        expect(res.status).toBe(400);
        expect(res.text).toBe("Invalid user id or book id provided.");
    });

    it('should return 200 and book data if book exists', async () => {
        const bookMock = { book_id: 1, user_id: 2, title: "Mock Book" };

        // Simulează apeluri consecutive prepare().get()
        db.prepare
            .mockReturnValueOnce({ get: () => bookMock }); // prima interogare - cartea există

        const res = await request(app).get('/2/1');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(bookMock);
    });

    it('should return 404 if book not in user library but user exists', async () => {
        db.prepare
            .mockReturnValueOnce({ get: () => undefined }) // prima interogare - cartea nu există
            .mockReturnValueOnce({ get: () => ({ user_id: 2 }) }); // a doua - userul există

        const res = await request(app).get('/2/999');
        expect(res.status).toBe(404);
        expect(res.text).toBe("The book is not in your library.");
    });

    it('should return 404 if user does not exist', async () => {
        db.prepare
            .mockReturnValueOnce({ get: () => undefined }) // cartea nu există
            .mockReturnValueOnce({ get: () => undefined }); // userul nu există

        const res = await request(app).get('/999/1');
        expect(res.status).toBe(404);
        expect(res.text).toBe("The user does not exist.");
    });

    it('should return 500 on internal error', async () => {
        db.prepare.mockImplementation(() => {
            throw new Error("Database failure");
        });

        const res = await request(app).get('/2/1');
        expect(res.status).toBe(500);
        expect(res.text).toBe("There is an error processing your request.");
    });
});
