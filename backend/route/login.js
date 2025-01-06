const express = require('express'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 
const router = express.Router(); 

// POST method for login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {                                                                                                                                                     
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

        // Include name and email in the response
        res.status(200).json({
            message: 'Login successful',
            authToken,
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// GET method for login (Example: Retrieve user details from token)
// GET method for retrieving user details from token
router.get('/login', async (req, res) => {
    try {
        console.log('Incoming request headers:', req.headers);

        // Check if 'authorization' header exists and is in the expected format
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header is missing.' });
        }

        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header is not in Bearer format.' });
        }

        // Extract the token after 'Bearer '
        const authToken = authHeader.split(' ')[1];
        
        if (!authToken) {
            return res.status(401).json({ message: 'Authorization token is missing.' });
        }

        let decoded;
        try {
            decoded = jwt.verify(authToken, process.env.JWT_SECRET || 'your_jwt_secret');
        } catch (err) {
            console.error('Token verification failed:', err);
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        console.log('Decoded token:', decoded);

        const user = await User.findById(decoded.id).select('name email');
        if (!user) {
            console.error('User not found for ID:', decoded.id);
            return res.status(404).json({ message: 'User not found.' });
        }

        console.log('Fetched user:', user);

        res.status(200).json({
            message: 'User retrieved successfully',
            user: { name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Error during GET /login:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});



module.exports = router;
