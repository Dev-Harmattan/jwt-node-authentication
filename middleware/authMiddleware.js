const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  const token = req.cookie.jwt;
  if(token) {
    const auth = jwt.verify(token, `${process.env.SECRETE},`, (err, decodeToken) => {
      if(err) {
        console.log(err.message)
        res.redirect('/login');
      }else{
        console.log(auth);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
}