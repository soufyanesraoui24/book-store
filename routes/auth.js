const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jsw = require('jsonwebtoken');
const router = express.Router();
const { User,validateRegisterUser } = require('../models/User');




/**
 * @description Register a new user
 * @route /api/auth/register
 * @method POST
 * @access Public
 */

router.post('/register', asyncHandler(async(req, res) => {
    // error handling
    const { error } = validateRegisterUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ message: 'User already registered' });

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
     result = await user.save();
     const token = user.generateAuthToken();
     const {password, ...others}=result._doc;
    res.status(201).json({...others,token});
    
}))

/**
 * @description Login user
 * @route /api/auth/login
 * @method POST
 * @access Public
 */ 
router.post('/login', asyncHandler(async(req, res) => {
    // error handling
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });
    //password validation
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) return res.status(400).json({ message: 'Invalid email or password' });
    
    const token = user.generateAuthToken();
    const {password, ...others}=user._doc;
          
    res.status(201).json({...others,token});
    res.status(200).json({ message: 'Login successful' });
    }))
module.exports = router;
