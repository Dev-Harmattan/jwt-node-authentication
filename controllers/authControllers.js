const User = require('../models/user');

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
    res.status(201).json({user});
  } catch (error) {
    console.log(error)
    res.status(400).send('Error, user not created!');
  }
}

exports.login_post = async (req, res) => {
  const {email, password} = req.body;
  res.status(200).json({email, password});
}