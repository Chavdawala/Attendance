const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markAttendanceSchema = new Schema({
  date: String,
  status: String, 
});

const userSchema = new Schema({
  department: { type: String, required: true },
  users: [{
    firstname: String,
    middlename: String,
    lastname: String,
    Birthdate: Date,
    City: String,
    State: String,
    email: { type: String, required: true },
    secondemail: String,
    phone: String,
    jobtype: String,
    joinDate: Date,
    contractDuration: Number,
    internshipDuration: Number,
    endDate: Date,
    shift: String,
    startTime: String,
    endTime: String,
    markAttendance: [markAttendanceSchema],
  }],
});

const UserDetails = mongoose.model('UserDetails', userSchema);

module.exports = UserDetails;