// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  gmail: String,
  password: String,
  phone: String,
  country: String,
 
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);
