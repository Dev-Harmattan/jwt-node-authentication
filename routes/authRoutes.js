const {Router} = require('express');
const router = Router();
const {signup_get, signup_post, login_get, login_post} = require('../controllers/authControllers');

router.route('/sign_up')
.get(signup_get)
.post(signup_post);

router.route('/login')
.get(login_get)
.post(login_post);

module.exports = router;