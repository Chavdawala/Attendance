const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  department: { type: String, required: true },
  users: [{
    firstname: String,
    middlename: String,
    lastname: String,
    Birthdate: Date,
    City: String,
    email: { type: String, unique: true },
    email1: String,
    phone: String,
    jobtype: String,
    joinDate: Date,
    contractDuration: Number,
    internshipDuration: Number,
    endDate: Date,
    shift: String,
    startTime: String,
    endTime: String,
  }],
});

const UserDetails = mongoose.model('UserDetails', userSchema);
module.exports = UserDetails;
