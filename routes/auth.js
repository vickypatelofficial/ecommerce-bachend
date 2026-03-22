const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- Register a new user ---

router.post('/register', async (req, res) => {
    try {
        const existingEmail = await User.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// --- login Router ---

router.post('/login', async (req, res) => {
    try {
        // 1. find user by theire email
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json({ message: "wrong email or password" });
        }
        // 2. compare the typed password with the scrampbled database password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Wrong email or password" });

        }
        // Create the "VIP Badge" (JWT Token)
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "3d" });
        // send the token and user details to the frontend!
        res.status(200).json({
            user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }, token: token
        });

    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;