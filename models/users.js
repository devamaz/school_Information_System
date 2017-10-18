const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// User Schema
const userSchema = mongoose.Schema({
  fullName:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please enter an email address'
  },
  gender:String,
  dateOfBirth: {
    type:Date,
    required: 'Please enter your date of birth'
  },
  homeTown: String,
  stateOfOrigin: String,
  lga: String,
  school: String,
  department: String,
  course: String,
  address: String,
 
});

module.exports = mongoose.model('User', userSchema);
