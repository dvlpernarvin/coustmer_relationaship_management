// const express = require('express');
// const User = require('../Models/User'); // User model

// const router = express.Router();

// // POST route to add data for Admin, Client, or Supplier
// router.post('/', async (req, res) => {
//     try {
//         const { 
//             companyName, 
//             uniqueRegistrationCode, 
//             firstName, 
//             lastName, 
//             email, 
//             phoneNumber, 
//             password, 
//             confirmPassword, 
//             userType 
//         } = req.body;
        
//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: "Passwords do not match" });
//         }

//         // Ensure the userType is valid (Admin, Client, Supplier)
//         if (!['Admin', 'Client', 'Supplier'].includes(userType)) {
//             return res.status(400).json({ message: "Invalid user type" });
//         }

//         const newUser = new User({
//             companyName,
//             uniqueRegistrationCode,
//             firstName,
//             lastName,
//             email,
//             phoneNumber,
//             password,
//             confirmPassword,
//             userType
//         });
        
//         await newUser.save();
//         res.status(201).json({ message: `${userType} registered successfully`, user: newUser });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// // GET route to fetch all users (Admin, Client, or Supplier)
// router.get('/', async (req, res) => {
//     try {
//         const { userType } = req.query;  // Get userType from query parameters
        
//         let users;
//         if (userType) {
//             // Fetch users of a specific type (Admin, Client, Supplier)
//             users = await User.find({ userType });
//         } else {
//             // Fetch all users
//             users = await User.find();
//         }
        
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// // Optional: GET route to fetch a specific user by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// module.exports = router;



const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();

const router = express.Router();

// 🟢 Registration Route
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
    body("phoneNumber").matches(/^\+?[1-9]\d{1,14}$/).withMessage("Invalid phone format"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const { role, companyName, uniqueRegistrationCode, firstName, lastName, email, phoneNumber, password } = req.body;

      let existingUser = await User.findOne({ email });
      if (existingUser) return res.status(409).json({ error: "Email already in use" });

      const newUser = new User({
        role,
        companyName,
        uniqueRegistrationCode,
        firstName,
        lastName,
        email,
        phoneNumber,
        password, // Pass plain text password; middleware will hash it
      });

      await newUser.save();
      res.status(201).json({ message: "Registration successful" });
    } catch (error) {
      console.error("❌ Registration Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// 🟢 Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Fix variable name

    if (!user) {
      console.log("❌ User Not Found");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("✅ User Found:", email);
    console.log("🔑 Entered Password:", password);
    console.log("🔒 Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔄 Password Match Result:", isMatch);

    if (!isMatch) {
      console.log("❌ Password Mismatch");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Login Successful");
    res.json({ token, role: user.role, userId: user._id });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
