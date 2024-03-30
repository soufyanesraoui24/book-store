const express = require('express');
const router = express.Router();
const {verifyTokenAndAdmin, verifyTokenAndAuthorization} = require('../middlewares/verifyToken');
const { getAllUsers, getUserById, deleteUser, updateUser } = require('../controllers/usersController');


router.get('/' ,verifyTokenAndAdmin ,getAllUsers);

router.route('/:id').get(verifyTokenAndAuthorization,getUserById)
                    .delete(verifyTokenAndAuthorization,deleteUser)
                    .put(verifyTokenAndAuthorization,updateUser);


module.exports = router;