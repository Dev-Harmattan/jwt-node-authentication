exports.signUp_get = (req, res) => {
  res.render('signUp');
}

exports.login_get = (req, res) => {
  res.render('login');
}

exports.signUp_post = (req, res) => {
  res.render('new Post');
}

exports.login_post = (req, res) => {
  res.render('new Sign up');
}