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
    afterEach(() => {
        jest.clearAllMocks();
    });
    test("valid user_id with books -> should return books with status 200", async () => {
        const books = [{ id: 1, title: "Book 1" }, { id: 2, title: "Book 2" }];
        
        db.prepare.mockReturnValue({ all: () => books });

        const res = await request(app).get("/id/123");
        expect(db.prepare).toHaveBeenCalledWith("SELECT * FROM library WHERE user_id = ?");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(books);
    });

    test("valid user_id without books -> should return 404", async () => {
        db.prepare.mockReturnValue({ all: () => [] });

        const res = await request(app).get("/id/999");
        expect(res.statusCode).toBe(404);
        expect(res.text).toContain("No books found for user with ID 999");
    });

    test("undefined user_id -> should return 400", async () => {
        const res = await request(app).get("/id/");
        expect(res.statusCode).toBe(400); 
        expect(res.text).toContain("Invalid user ID.");
    });

    test('should return status code 500', async () => {
        db.prepare.mockImplementation(() => {
            throw new Error("DB error");
        });
        
        const response = await request(app).get('/id/1');
        
        expect(response.status).toBe(500);
        expect(response.text).toContain('error processing your request');
        });

    test("user_id is a string with books -> should return books with status code 200", async () => {
            const books = [{ id: 5, title: "Book 5" }];
            db.prepare.mockReturnValue({ all: () => books });

            const res = await request(app).get("/id/abc123");
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(books);
        });

    test("user_id is a string without books -> should return 404", async () => {
            db.prepare.mockReturnValue({ all: () => [] });

            const res = await request(app).get("/id/abc123");
            expect(res.statusCode).toBe(404);
        });

    test("user_id is a negative number with books -> should return books with status code 200", async () => {
            const books = [{ id: 6, title: "Book 6" }];
            db.prepare.mockReturnValue({ all: () => books });

            const res = await request(app).get("/id/-123");
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(books);
        });
        
    test("user_id is a negative number without books -> should return 404", async () => {
            db.prepare.mockReturnValue({ all: () => [] });

            const res = await request(app).get("/id/-123");
            expect(res.statusCode).toBe(404);
        });

});