const express = require('express');
const { 
  saveUser, 
  getUsers, 
  getUsersByDepartment, 
  getUserById 
} = require('../Controller/UserController');

const router = express.Router();

// Define routes
router.post('/saveUser', saveUser); // Save user data (with department grouping)
router.get('/getUsers', getUsers); // Get all users in all departments
router.get('/getUsers/:department', getUsersByDepartment); // Get users by department
router.get('/getUser/:department/:userId', getUserById); // Get a single user by ID within a department

module.exports = router;
