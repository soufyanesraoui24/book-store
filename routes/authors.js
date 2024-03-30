const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken');
const { authors } = require('../data');
const { getAllAuthors, getAuthorById ,createAuthor,updateAuthor,deleteAuthor} = require('../controllers/authorsController');

router.route('/').get(getAllAuthors )
                 .post(verifyTokenAndAdmin,createAuthor);
                 
router.route('/:id').get(getAuthorById)
                    .put(verifyTokenAndAdmin,updateAuthor)
                    .delete(verifyTokenAndAdmin,deleteAuthor);


//export router
module.exports = router;

    