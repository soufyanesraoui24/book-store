const express = require('express');
const router = express.Router();
const {getForgotPasswordView} = require('../controllers/passwordController');

router.route('/forgot-password').get(getForgotPasswordView);


module.exports = router;