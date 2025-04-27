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

describe("GET /id/:user_id - Structural testing", () => {

    //1.Statement Coverage
    describe('1. Statement Coverage', () => {
            afterEach(() => {
                jest.clearAllMocks();
            });
            
            test('invalid input', async () => {
                const consoleSpy = jest.spyOn(console, 'error');
                const response = await request(app).get('/user-invalid123/10');
                
                expect(response.status).toBe(400);
                expect(response.text).toBe("Invalid user id or book id provided.");
                expect(consoleSpy).toHaveBeenCalledWith("Invalid user id or book id provided.");
                consoleSpy.mockRestore();
            });
    
            test('existent book', async () => {
                const bookMoked = jest.fn().mockReturnValue({
                    user_id: 1,
                    book_id: 1,
                    readit: true
                });

                const mockPrepare = jest.fn().mockReturnValue({ get: bookMoked });
                db.prepare = mockPrepare;
    
                const response = await request(app).get('/1/1');
                
                expect(response.status).toBe(200);
                expect(response.body).toEqual({
                    user_id: 1,
                    book_id: 1,
                    readit: true
                });
                expect(mockPrepare).toHaveBeenCalledWith("SELECT * FROM library WHERE user_id = ? AND book_id = ?");
            });

            test('non-existent book ', async () => {
                const bookMoked = jest.fn()
                    .mockReturnValueOnce(null)
                    .mockReturnValueOnce({ user_id: 1 });
               
                const mockPrepare = jest.fn().mockReturnValue({ get: bookMoked });
                db.prepare = mockPrepare;
    
                const response = await request(app).get('/1/2');
                
                expect(response.status).toBe(404);
                expect(response.text).toBe("The book is not in your library.");
                expect(db.prepare).toHaveBeenCalledTimes(2);
                expect(mockPrepare.mock.calls[0][0]).toBe("SELECT * FROM library WHERE user_id = ? AND book_id = ?");
                expect(mockPrepare.mock.calls[1][0]).toBe("SELECT * FROM library WHERE user_id = ?");
            });
    
            test('non-existent user', async () => {
                const bookMoked = jest.fn().mockReturnValue(null);
                
                const mockPrepare = jest.fn().mockReturnValue({ get: bookMoked });
                db.prepare = mockPrepare;
    
                const response = await request(app).get('/999/1');
                
                expect(response.status).toBe(404);
                expect(response.text).toBe("The user does not exist.");
                expect(mockPrepare.mock.calls[0][0]).toBe("SELECT * FROM library WHERE user_id = ? AND book_id = ?");
                expect(mockPrepare.mock.calls[1][0]).toBe("SELECT * FROM library WHERE user_id = ?");
            });
    
    
            test('Database Error"', async () => {
                const consoleSpy = jest.spyOn(console, 'error');

                db.prepare.mockImplementation(() => {
                    throw new Error('DB error');
                });
    
                const response = await request(app).get('/1/1');
                
                expect(response.status).toBe(500);
                expect(response.text).toBe("There is an error processing your request.");
                expect(consoleSpy).toHaveBeenCalledWith("There is an error in userid+bookid : ", "DB error");
                consoleSpy.mockRestore();
            });
    });

    // 2. Decision coverage - covered by previous tests

    // 3. Condition coverage - some of the conditions were covered by previous tests
    describe('3. Condition coverage', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });
        
        test('!user_id.trim() = true', async () => {
            const consoleSpy = jest.spyOn(console, 'error');
            const response = await request(app).get('/%20/1');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
            expect(consoleSpy).toHaveBeenCalledWith("Invalid user id or book id provided.");
            consoleSpy.mockRestore();
        });

        test('!book_id.trim() = true', async () => {
            const consoleSpy = jest.spyOn(console, 'error');
            const response = await request(app).get('/1/%20');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
            expect(consoleSpy).toHaveBeenCalledWith("Invalid user id or book id provided.");
            consoleSpy.mockRestore();
        });

        test('isNaN(user_id) = true', async () => {
            const consoleSpy = jest.spyOn(console, 'error');
            const response = await request(app).get('/abc/1');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
            expect(consoleSpy).toHaveBeenCalledWith("Invalid user id or book id provided.");
            consoleSpy.mockRestore();
        });

        test('isNaN(book_id) = true', async () => {
            const consoleSpy = jest.spyOn(console, 'error');
            const response = await request(app).get('/1/abc');
            
            expect(response.status).toBe(400);
            expect(response.text).toBe("Invalid user id or book id provided.");
            expect(consoleSpy).toHaveBeenCalledWith("Invalid user id or book id provided.");
            consoleSpy.mockRestore();
        });

    });

    //4. Condition/decision coverage - covered by previous tests

    //5. Multiple Condition Coverage - covered by previous tests
    
    //6. Modified condition/decision (MC/DC) coverage - covered by previous tests

    //7. Independent Circuit Coverage - covered by previous tests

    //8. Path Coverage - covered by previous tests
});