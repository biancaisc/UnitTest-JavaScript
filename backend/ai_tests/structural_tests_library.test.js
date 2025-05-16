import { getUserBook } from '../routes/libraryService.js'; // ajustează path-ul real

describe('getUserBook', () => {
    let mockDb;

    beforeEach(() => {
        mockDb = {
            prepare: jest.fn()
        };
    });

    it('throws 400 if input is invalid', () => {
        expect(() => getUserBook(mockDb, ' ', 'abc')).toThrow(expect.objectContaining({
            status: 400,
            message: "Invalid user id or book id provided."
        }));
    });

    it('returns 200 and book data if book is found', () => {
        const mockBook = { book_id: 1, user_id: 2, title: "Book 1" };

        mockDb.prepare.mockReturnValueOnce({
            get: () => mockBook
        });

        const result = getUserBook(mockDb, '2', '1');
        expect(result).toEqual({ status: 200, data: mockBook });
    });

    it('throws 404 if book not found but user exists', () => {
        mockDb.prepare
            .mockReturnValueOnce({ get: () => undefined }) // prima: cartea
            .mockReturnValueOnce({ get: () => ({ user_id: 2 }) }); // a doua: userul

        expect(() => getUserBook(mockDb, '2', '99')).toThrow(expect.objectContaining({
            status: 404,
            message: "The book is not in your library."
        }));
    });

    it('throws 404 if user does not exist', () => {
        mockDb.prepare
            .mockReturnValueOnce({ get: () => undefined }) // cartea
            .mockReturnValueOnce({ get: () => undefined }); // userul

        expect(() => getUserBook(mockDb, '999', '1')).toThrow(expect.objectContaining({
            status: 404,
            message: "The user does not exist."
        }));
    });
});
