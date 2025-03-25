const express = require('express');
const { 
  saveUser, 
  getUsers, 
  updateUser,
  deleteUser,  
  getUserByEmail,
  markAttendance,
  getmarkAttendanceByEmail
} = require('../Controller/UserController');

const router = express.Router();

// Define routes
router.post('/saveUser', saveUser);
router.get('/getUsers', getUsers); 
router.put('/updateUser/:email', updateUser);
router.delete('/deleteUser/:email', deleteUser);
router.get('/getUser/:email', getUserByEmail); // 
router.post('/markAttendance/:email', markAttendance);
router.get('/getmarkAttendance/:email', getmarkAttendanceByEmail);

module.exports = router;
