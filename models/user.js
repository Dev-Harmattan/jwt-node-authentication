const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Password must atleast 6 characters']
  }
})

//mogoose hooks:

//fire function after document save to Db
userSchema.post('save', function(doc, next){
  console.log('New user after document save', doc);
  next();
});

//fire function before document save to Db
userSchema.pre('save', function(next){
  console.log('New user before document save', this);
  next();
})

const User = mongoose.model('user', userSchema);
module.exports = User;