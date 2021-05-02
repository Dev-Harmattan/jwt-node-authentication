const {Router} = require('express');
const router = Router();
const {signUp_get, signUp_post, login_get, login_post} = require('../controllers/authControllers');

router.route('/sign_up')
.get(signUp_get)
.post(signUp_post);

router.route('/login')
.get(login_get)
.post(login_post);

module.exports = router;