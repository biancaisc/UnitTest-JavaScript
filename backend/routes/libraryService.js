// libraryService.js
export function getUserBook(db, user_id, book_id) {
    const q = "SELECT * FROM library WHERE user_id = ? AND book_id = ?";

    if (!user_id.trim() || !book_id.trim() || isNaN(user_id) || isNaN(book_id)) {
        throw { status: 400, message: "Invalid user id or book id provided." };
    }

    const book = db.prepare(q).get(user_id, book_id);

    if (book) {
        return { status: 200, data: book };
    } else {
        const userExists = db.prepare("SELECT * FROM library WHERE user_id = ?").get(user_id);
        if (userExists) {
            throw { status: 404, message: "The book is not in your library." };
        } else {
            throw { status: 404, message: "The user does not exist." };
        }
    }
}
