const express = require('express');
const router = express.Router();
const {getForgotPasswordView, sendResetPasswordEmail, getResetPasswordView, resetThePassword} = require('../controllers/passwordController');

router.route('/forgot-password').get(getForgotPasswordView)
                                .post(sendResetPasswordEmail);

router.route('/reset-password/:userId/:token').get(getResetPasswordView)
                                             .post(resetThePassword)



module.exports = router;