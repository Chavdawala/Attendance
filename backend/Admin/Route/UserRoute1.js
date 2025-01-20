const express = require('express');
const { saveUser, getUsers, getUserById } = require('../Controller/UserController');

const router = express.Router();

// Define routes
router.post('/saveUser', saveUser); // Save user data
router.get('/getUsers', getUsers); // Get all users
router.get('/getUser/:id', getUserById); // Get user by ID

module.exports = router;
