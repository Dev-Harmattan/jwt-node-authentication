const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwt;
  if(token) {
    jwt.verify(token, `${process.env.SECRETE}`, (err, decodeToken) => {
      if(err) {
        console.log(err.message)
        res.redirect('/login');
      }else{
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
}

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if(token) {
    jwt.verify(token, `${process.env.SECRETE}`, async (err, decodeToken) => {
      if(err) {
        res.locals.user = null;
        next();
      }else{
        const user = await User.findById(decodeToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = {authMiddleware, checkUser};