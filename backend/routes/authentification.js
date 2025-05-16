import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from '../.config.js';

const router = express.Router();


export function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // if (!token)  {
  //   return res.status(401).json({ success: false, message: "You are not authenticated!" });
  // }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // if (err) {
    //   return res.status(403).json({ success: false, message: "Invalid credentials." });
    // }
    req.user = user;
    next();
  });
}

// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15min" });
// }

// function generateRefreshToken(user) {
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  
//   const existingToken = db.prepare("SELECT * FROM refresh_tokens WHERE token = ?").get(refreshToken);
//   if (existingToken) {
//     console.log("Existing refresh token detected, skipping insert.");
//     return refreshToken;
//   }

//   try {
//     const query = "INSERT INTO refresh_tokens (token) VALUES (?)";
//     db.prepare(query).run(refreshToken);
//     return refreshToken;
//   } catch (error) {
//     console.error("Error saving refresh token:", error.message);
//     throw new Error("Failed to generate refresh token");
//   }
// }


// router.post("/register", async (req, res) => {
//   const { name, password } = req.body;

//   try {
//     const checkQuery = "SELECT * FROM users WHERE name = ?";
//     const existingUser = db.prepare(checkQuery).get(name);

//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "User with this name already exists." });
//     }

//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const userInsertQuery = "INSERT INTO users (name, password) VALUES (?, ?)";
//     const result = db.prepare(userInsertQuery).run(name, hashedPassword);

//     const userId = result.lastInsertRowid;
//     const roleQuery = "INSERT INTO userroles (user_id, role_id) VALUES (?, ?)";
//     db.prepare(roleQuery).run(userId, 2); //Default role: user

//     res.status(201).json({ success: true, message: "Account created successfully!"});
//   } catch (error) {
//     console.error("Error during registration:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error during registration." });
//   }
// });

// router.post("/login", async (req, res) => {
//   const { name, password } = req.body;
//   try {
//     const query = "SELECT * FROM users WHERE name = ?";
//     const user = db.prepare(query).get(name);

//     if (!user) {
//       return res.status(400).json({ success: false, message: "Invalid credentials." });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       return res.status(400).json({ success: false, message: "Invalid credentials." });
//     }

//     const accessToken = generateAccessToken({ id: user.id, name: user.name });
//     const refreshToken = generateRefreshToken({ id: user.id, name: user.name });

//     res.json({
//       success: true,
//       message: "Login successful",
//       id: user.id,
//       username: user.name,
//       accessToken,
//       refreshToken
//     });
//   } catch (error) {
//     console.error("Error during login:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error during login." });
//   }
// });

// router.delete("/:userId", verifyToken, (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const roleQuery = "SELECT role_id FROM userroles WHERE user_id = ?";
//     const userRoles = db.prepare(roleQuery).all(req.user.id);

//     const isAdmin = userRoles.some((role) => role.role_id === 1);
//     if (!isAdmin) {
//       return res.status(403).json({ success: false, message: "You are not authorized to delete users!" });
//     }

//     const deleteQuery = "DELETE FROM users WHERE id = ?";
//     db.prepare(deleteQuery).run(userId);

//     res.status(200).json({ success: true, message: "User deleted successfully!" });
//   } catch (error) {
//     console.error("Error during user deletion:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error during user deletion." });
//   }
// });

// router.post("/assign-admin", verifyToken, (req, res) => {
//   const { userId } = req.body;

//   try {
//     const roleQuery = "SELECT role_id FROM userroles WHERE user_id = ?";
//     const userRoles = db.prepare(roleQuery).all(req.user.id);

//     const isAdmin = userRoles.some((role) => role.role_id === 1);
//     if (!isAdmin) {
//       return res.status(403).json({ success: false, message: "Only admins can assign roles!" });
//     }

//     const insertRoleQuery = "INSERT INTO userroles (user_id, role_id) VALUES (?, ?)";
//     db.prepare(insertRoleQuery).run(userId, 1); //Role ID 1: Admin

//     res.status(200).json({ success: true, message: "Admin role assigned successfully!" });
//   } catch (error) {
//     console.error("Error assigning admin role:", error.message);
//     res.status(500).json({ success: false, message: "Error assigning admin role." });
//   }
// });

// router.post("/refresh", (req, res) => {
//   const { token: refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.status(401).json({ success: false, message: "You are not authenticated!" });
//   }

//   try {
//     const query = "SELECT * FROM refresh_tokens WHERE token = ?";
//     const tokenEntry = db.prepare(query).get(refreshToken);

//     if (!tokenEntry) {
//       return res.status(403).json({ success: false, message: "Invalid refresh token." });
//     }

//     jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//       if (err) {
//         return res.status(403).json({ success: false, message: "Invalid refresh token." });
//       }

//       const accessToken = generateAccessToken({ id: user.id, name: user.name });
//       res.json({ accessToken });
//     });
//   } catch (error) {
//     console.error("Error during token refresh:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error during token refresh." });
//   }
// });

// router.post("/logout", (req, res) => {
//   const { token: refreshToken } = req.body;

//   try {
//     const query = "DELETE FROM refresh_tokens WHERE token = ?";
//     db.prepare(query).run(refreshToken);

//     res.status(200).json({ success: true, message: "Logged out successfully!" });
//   } catch (error) {
//     console.error("Error during logout:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error during logout." });
//   }
// });

// router.get("/verify-token", verifyToken, (req, res) => {
//   return res.status(200).json({ success: true, message: "Token is valid." });
// });

// export default router;
