// UserDetailsSchema.js
const mongoose = require('mongoose');

// Schema without the required fields 'name' and 'password'
const userDetailsSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  Birthdate: { type: Date },
  City: { type: String },
  email: { type: String, unique: true }, // You can keep email unique
  email1: { type: String },
  phone: { type: String },
  department: { type: String },
  jobtype: { type: String },
  joinDate: { type: Date },
  contractDuration: { type: Number },
  internshipDuration: { type: Number },
  endDate: { type: Date },
  shift: { type: String },
  startTime: { type: String },
  endTime: { type: String },
});

// Check if the 'UserDetails' model is already defined, and if not, define it.
module.exports = mongoose.models.UserDetails || mongoose.model('UserDetails', userDetailsSchema);
