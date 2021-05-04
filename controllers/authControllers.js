const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = {email: '', password: ''}
  
  if(err.code  === 11000){
    errors.email = 'User with that email already exist';
  }
  
  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  const token = jwt.sign({id}, `${process.env.SECRETE}`, {expiresIn: maxAge});
  return token;
}

exports.signup_get = (req, res) => {
  res.render('signUp');
}

exports.login_get = (req, res) => {
  res.render('login');
}

exports.signup_post = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.create({email, password});
    if(user){
      const token = createToken(user._id);
      res.cookie('jwt', token, {maxAge: maxAge * 1000, httpOnly: true});
      res.status(201).json({user});
    }
    
  } catch (error) {
    const errors = handleErrors(error);
    res.status(400).json({errors});
  }
}

exports.login_post = async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await User.login(email, password);
    res.status(201).json({user: user._id});
  } catch (error) {
    res.status(400).json({});
  }

}