const express = require('express');
const jwt = require('jsonwebtoken'); // Add this if not already imported
const router = express.Router(); // Initialize the router object
const User = require('../models/User'); // Adjust the path to your User model
const cors = require('cors');

// POST /api/register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!', user: { name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




module.exports = router; 
