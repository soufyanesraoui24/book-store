const asyncHandler = require('express-async-handler');
const { User ,validateChangePassword} = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcryptjs')
const nodemailer = require('nodemailer')

/**
 * @desc get forget-password
 * @route password/forget-password
 * @method get
 * @access public
 */
module.exports.getForgotPasswordView = asyncHandler((req,res) => {
    res.render('forgot-password');
})
/**
 * @desc send forget-password
 * @route password/forget-password
 * @method post
 * @access public
 */
module.exports.sendResetPasswordEmail = asyncHandler(async(req,res) => {
    const user = await User.findOne({email:req.body.email})
    // console.log(user.id);
    if (!user) {
        return res.status(404).json({message: "user not found"})  
    }
    const secret = process.env.JWT_SECRET + user.password
    const token = jwt.sign({email: user.email, id: user.id}, secret, {
        expiresIn: '10m'
    })
    const link = `http://localhost:3000/password/reset-password/${user.id}/${token}`
    // res.json({message: "click on the link to reset your password", resetPasswordLink: link} )
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASSWORD
        }
    })
    const mailOptions = {
        from: 'your email',
        to: user.email,
        subject: 'Reset Password',
        html: `<div>
            <h4> click on the link to reset your password </h4>
            <P>${link}</P>
            </div>`
    }
    transporter.sendMail(mailOptions, (err,info) => {
        if (err) {
            console.log(err);
            res.status(500).json({message: "something went wrong"})
        } else {
            console.log(info.response);
            res.render('link-send')
        }
    })

})
/**
 * @desc get reset password
 * @route /password/reset-password/:userId/:token
 * @method get
 * @access public
 */
module.exports.getResetPasswordView = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.userId)
    // console.log(user.id);
    if (!user) {
        return res.status(404).json({message: "user not found"})  
    }
    const secret = process.env.JWT_SECRET + user.password;
    try {
        jwt.verify(req.params.token, secret)
        res.render('reset-password',{email: user.email})
    } catch (error) {
        console.log(error);
        res.json({message: "error"})
    }})
/**
 * @desc reset the password
 * @route password/reset-password/:userId/:token
 * @method post
 * @access public
 */
module.exports.resetThePassword = asyncHandler(async(req,res) => {
    const{error}= validateChangePassword(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message})
    }
    
    const user = await User.findById(req.params.userId)
    if (!user) {
        return res.status(404).json({message: "user not found"})  
    }
    const secret = process.env.JWT_SECRET + user.password

    try {
        jwt.verify(req.params.token, secret)
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
        user.password= req.body.password;
        await user.save()
        res.render('success-password')
    } catch (error) {
        console.log(error);
        res.json({message: "error"})
    }})