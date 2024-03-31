const asyncHandler = require('express-async-handler');

module.exports.getForgotPasswordView = asyncHandler((req,res) => {
    res.render('forgot-password');

})