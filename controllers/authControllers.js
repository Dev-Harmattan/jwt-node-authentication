exports.signUp_get = (req, res) => {
  res.render('signUp');
}

exports.login_get = (req, res) => {
  res.render('login');
}

exports.signUp_post = (req, res) => {
  const {email, password} = req.body;
  res.status(200).json({email, password});
}

exports.login_post = (req, res) => {
  const {email, password} = req.body;
  res.status(200).json({email, password});
}