const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const { User,validateUpdateUser } = require('../models/User');
const bcrypt = require('bcryptjs');
const {verifyTokenAndAdmin, verifyTokenAndAuthorization} = require('../middlewares/verifyToken');

/**
 * @description get all users
 * @route /api/auth
 * @method GET
 * @access privat (only admin )
 */
router.get('/' ,verifyTokenAndAdmin ,asyncHandler(async(req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json(users);
}));

/**
 * @description get user by id
 * @route /api/auth/:id
 * @method GET
 * @access privat (only admin or user can get his account)
 */
router.get('/:id',verifyTokenAndAuthorization, asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
}
));

/**
 * @description delete user
 * @route /api/auth/:id
 * @method DELETE
 * @access privat (only admin or user can delete his account)
*/
router.delete('/:id',verifyTokenAndAuthorization, asyncHandler(async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User has been deleted' });
}
));


/**
 * @description update user
 * @route /api/users/:id
 * @method PUT
 * @access privat (only user can update his account or Admin can update any account)
 */ 
router.put('/:id',verifyTokenAndAuthorization ,asyncHandler(async(req, res) => {
      

    // error handling
    const { error } = validateUpdateUser(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    console.log(req.headers);

    if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    
    const userUpdated = await User.findByIdAndUpdate(req.params.id,
        {$set :{
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    
    }}, { new: true }).select('-password');
    if (!userUpdated) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(userUpdated);
}));

module.exports = router;