import express from 'express';
import { db } from '../.config.js';
import { verifyToken } from './authentification.js'; 

const router = express.Router();


// router.get('/:id', (req, res) => {
//     const bookId = req.params.id;
//     const q = `
//         SELECT comments.user_id, comments.id, comments.content, users.name AS user_name
//         FROM comments
//         JOIN users ON comments.user_id = users.id
//         WHERE comments.book_id = ?`;

//     try {
//         const comments = db.prepare(q).all(bookId);

//         if (comments.length > 0) {
//             return res.json(comments);
//         } else {
//             return res.status(404).send('No comments found for this book!');
//         }
//     } catch (error) {
//         console.error('Error fetching comments: ', error.message);
//         return res.status(500).send('Error fetching comments!');
//     }
// });


router.post('/', verifyToken, (req, res) => {
    const { book_id, content } = req.body;
    const user_id = req.user.id; 

    if (!book_id || !content) {
        return res.status(400).send('All fields are required!');
    }

    if (typeof book_id !== 'number' || book_id <= 0){
        return res.status(400).send('Invalid book ID!');
    }

    if(content.length < 5) {
        return res.status(400).send('Content is too short!');
    }

    if(content.length > 500) {
        return res.status(400).send('Content is too long!');
    }

    const q = 'INSERT INTO comments (user_id, book_id, content) VALUES (?, ?, ?)';
    try {
        db.prepare(q).run(user_id, book_id, content);
        return res.status(201).send('Comment added successfully!');
    } catch (error) {
        console.error('Error adding comment: ', error.message);
        return res.status(500).send('Error adding comment!');
    }
});


// router.put('/:id', verifyToken, (req, res) => {
//     const commentId = req.params.id;
//     const { content } = req.body;

//     if (!content || content.trim() === '') {
//         return res.status(400).send('Content cannot be empty.');
//     }

//     const q = `
//         UPDATE comments
//         SET content = ?
//         WHERE id = ? AND user_id = ?`;

//     try {
//         const result = db.prepare(q).run(content, commentId, req.user.id);

//         if (result.changes > 0) {
//             return res.send('Comment updated successfully!');
//         } else {
//             return res.status(404).send('Comment not found or you are not authorized to edit this comment.');
//         }
//     } catch (error) {
//         console.error('Error updating comment: ', error.message);
//         return res.status(500).send('Error updating comment!');
//     }
// });


// router.delete('/:id', verifyToken, (req, res) => {
//     const commentId = req.params.id;

//     const q = `
//         DELETE FROM comments
//         WHERE id = ? AND user_id = ?`;

//     try {
//         const result = db.prepare(q).run(commentId, req.user.id);

//         if (result.changes > 0) {
//             return res.send('Comment deleted successfully!');
//         } else {
//             return res.status(404).send('Comment not found or you are not authorized to delete this comment.');
//         }
//     } catch (error) {
//         console.error('Error deleting comment: ', error.message);
//         return res.status(500).send('Error deleting comment!');
//     }
// });

export default router;
