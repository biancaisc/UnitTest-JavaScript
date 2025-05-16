import express from "express";
import Database from 'better-sqlite3';
import { db } from '../.config.js';

const router = express.Router();

// router.get("/", (req, res) => {
//   const q = "SELECT * FROM library";
//   try {
//     const rows = db.prepare(q).all();
//     return res.json(rows);
//   } catch (error) {
//     console.error("There is an error: ", error.message);
//     return res.status(400).send("There is an error!");
//   }
// });

// router.get("/id/:user_id", (req, res) => {
//     const { user_id } = req.params;

//     if (!user_id) {
//         console.error("Invalid user id provided.");
//         return res.status(400).send("Invalid user ID.");
//     }

//     const q = "SELECT * FROM library WHERE user_id = ?";

//     try {
//         const book = db.prepare(q).all(user_id);

//         if (book && book.length > 0) {
//             return res.status(200).json(book);
//         } else {
//             res.status(404).send(`No books found for user with ID ${user_id}.`);
//         }
//     } catch (error) {
//         console.error("There is an error in get userid: ", error.message);
//         res.status(500).send("There is an error processing your request.");
//     }
// });
import { getUserBook } from "./libraryService.js";

router.get("/:user_id/:book_id", (req, res) => {
    const { user_id, book_id } = req.params;
    try {
        const result = getUserBook(db, user_id, book_id);
        res.status(result.status).json(result.data);
    } catch (err) {
        res.status(err.status || 500).send(err.message || "Unknown error");
    }
});

// router.get("/:user_id/:book_id", (req, res) => {
//     const { user_id, book_id } = req.params;
//     const q = "SELECT * FROM library WHERE user_id = ? AND book_id = ?";
    
//     try {
//         if(!user_id.trim() || !book_id.trim() || isNaN(user_id) || isNaN(book_id)){
//             console.error("Invalid user id or book id provided.");
//             return res.status(400).send("Invalid user id or book id provided.");
//         }
//         const book = db.prepare(q).get(user_id, book_id);

//         if (book) {
//             return res.status(200).json(book);
//         } else {
//             const userExists = db.prepare("SELECT * FROM library WHERE user_id = ?").get(user_id);
//             if (userExists) {
//                 return res.status(404).send("The book is not in your library.");
//             }
//             else{
//                 return res.status(404).send("The user does not exist.");
//             }
//         }
//     } catch (error) {
//         console.error("There is an error in userid+bookid : ", error.message);
//         res.status(500).send("There is an error processing your request.");
//     }
// });


// router.post("/add", async (req, res) => {
//     const { user_id, book_id } = req.body; 
//     //const checkQuery = "SELECT * FROM library WHERE user_id = ? ";
//     const insertQuery = "INSERT INTO library(`user_id`, `book_id`) VALUES (?, ?)";

//     try {
//         // // Verifică dacă cartea există deja în bibliotecă
//         //  const [existingEntries] = await db.prepare(checkQuery).all(user_id);
//         // console.log( existingEntries);
//         //  if (existingEntries.length > 0) {
//         //      return res.status(400).json({ message: "The book is already in your library." });
//         //  }

//         db.prepare(insertQuery).run(user_id, book_id);
//         return res.status(200).json({ message: "The book was added to your library!" });
//     } catch (error) {
//         console.error("There was an error while adding the book: ", error.message);
//         return res.status(500).json({ message: "There was an error while adding the book!" });
//     }
// });


// // router.put("/:user_id/:book_id", verifyToken, isAdmin, (req, res) => {
// //   const bookId = req.params.id;
// //   const { category_id, title, author, description } = req.body;
// //   const q = "UPDATE books SET category_id = ?, title = ?, author = ?, description = ? WHERE id = ?";
// //   try {
// //     const result = db.prepare(q).run(category_id, title, author, description, bookId);
// //     if (result.changes > 0) {
// //       res.send("The book was updated!");
// //     } else {
// //       res.status(404).send("The book was not found.");
// //     }
// //   } catch (error) {
// //     console.error("There occurred an error in the process of updating the book: ", error.message);
// //     return res.status(500).send("There occurred an error in the process of updating the book!");
// //   }
// // });

// router.delete("/delete/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q = "DELETE FROM library WHERE book_id = ?";
//   try {
//     const result = db.prepare(q).run(bookId);
//     if (result.changes > 0) {
//       res.send("The book was removed from your library!");
//     } else {
//       res.status(404).send("The book was not found in your library!");
//     }
//   } catch (error) {
//     console.error("There occurred an error in the process of deleting the book: ", error.message);
//     return res.status(500).send("There occurred an error in the process of deleting the book!");
//   }
// });


// router.put("/mark-as-read/:user_id/:book_id", (req, res) => {
//   const { user_id, book_id } = req.params;

//   try {
//       const sql = `
//           UPDATE library
//           SET readit = 1
//           WHERE user_id = ? AND book_id = ?;
//       `;
//       const result = db.prepare(sql).run(user_id, book_id);

//       if (result.changes > 0) {
//           res.status(200).json({ message: "Book marked as read successfully!" });
//       } else {
//           res.status(404).json({ error: "Book not found in your library or already marked as read." });
//       }
//   } catch (error) {
//       console.error("Error marking book as read:", error.message);
//       res.status(500).json({ error: "An error occurred while marking the book as read." });
//   }
// });


export default router;
