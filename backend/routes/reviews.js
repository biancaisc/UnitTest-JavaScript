import express from 'express';
import Database from 'better-sqlite3';
import { verifyToken } from './authentification.js'; 
import { db } from '../.config.js';

const router = express.Router();


// router.get('/:id', (req, res) => {
//     const bookId = req.params.id;
//     const q = `
//         SELECT reviews.user_id, reviews.id, reviews.rating, users.name AS user_name
//         FROM reviews
//         JOIN users ON reviews.user_id = users.id
//         WHERE reviews.book_id = ?`;

//     try {
//         const reviews = db.prepare(q).all(bookId);

//         if (reviews.length > 0) {
//             return res.json(reviews);
//         } else {
//             return res.status(404).send('No reviews found for this book!');
//         }
//     } catch (error) {
//         console.error('Error fetching reviews: ', error.message);
//         return res.status(500).send('Error fetching reviews!');
//     }
// });

router.post('/', verifyToken, (req, res) => {
    const { book_id, rating } = req.body;
    const user_id = req.user.id; 

    if (!book_id || !rating) {
        return res.status(400).send('All fields are required!');
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
        return res.status(400).send('Rating must be a number between 1 and 5.');
    }

    const checkDuplicateQuery = `
        SELECT * FROM reviews WHERE user_id = ? AND book_id = ?;
    `;
    const insertQuery = `
        INSERT INTO reviews (user_id, book_id, rating) VALUES (?, ?, ?);
    `;

    try {
        const existingReview = db.prepare(checkDuplicateQuery).get(user_id, book_id);
        if (existingReview) {
            return res.status(400).send('You have already added a review for this book.');
        }

        db.prepare(insertQuery).run(user_id, book_id, rating);
        return res.status(201).send('Review added successfully!');
    } catch (error) {
        console.error('Error adding review: ', error.message);
        return res.status(500).send('Error adding review!');
    }
});

// router.put('/:id', verifyToken, (req, res) => {
//     const reviewId = req.params.id;
//     const { rating } = req.body;

//     if (isNaN(rating) || rating < 1 || rating > 5) {
//         return res.status(400).send('Rating must be a number between 1 and 5.');
//     }

//     const q = 'UPDATE reviews SET rating = ? WHERE id = ?';

//     try {
//         const result = db.prepare(q).run(rating, reviewId);

//         if (result.changes > 0) {
//             return res.send('Review updated successfully!');
//         } else {
//             return res.status(404).send('Review not found!');
//         }
//     } catch (error) {
//         console.error('Error updating review: ', error.message);
//         return res.status(500).send('Error updating review!');
//     }
// });

// router.delete('/:id', verifyToken, (req, res) => {
//     const reviewId = req.params.id;
//     const q = 'DELETE FROM reviews WHERE id = ?';
//     try {
//         const result = db.prepare(q).run(reviewId);
//         if (result.changes > 0) {
//             return res.send('Review deleted successfully!');
//         } else {
//             return res.status(404).send('Review not found!');
//         }
//     } catch (error) {
//         console.error('Error deleting review: ', error.message);
//         return res.status(500).send('Error deleting review!');
//     }
// });

export default router;
