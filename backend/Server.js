const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Import routes
const register = require('./route/routes');
const loginRoute = require('./route/login');
const userRoute1 = require('./route/user'); // Renamed to userRoute1
const logoutTime = require('./route/Logouttime'); // Corrected to match the import
const UserRoute1 = require('./Admin/Route/UserRoute1'); // Renamed to adminUserRoute

// Use routes
app.use('/api', register);       
app.use('/api', loginRoute);     
app.use('/api', userRoute1);    
app.use('/api', logoutTime);     
app.use('/api', UserRoute1); 

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server running on port ${process.env.PORT || 5000}`);
        });
    })
    .catch(err => console.log(err));
