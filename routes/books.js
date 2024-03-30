const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken');
const {getAllBooks,getBookById,createBook,updateBook,deleteBook} = require('../controllers/bookController');

//http methods(verbs) : get,post,put,delete
router.route('/')
    .get(getAllBooks)
    .post(verifyTokenAndAdmin,createBook);
// router.get('/',getAllBooks);
// router.post('/',verifyTokenAndAdmin,createBook);
router.route('/:id')
    .get(getBookById)
    .put(verifyTokenAndAdmin,updateBook)
    .delete(verifyTokenAndAdmin,deleteBook);
// router.get('/:id',getBookById);
// router.put('/:id',verifyTokenAndAdmin,updateBook);
// router.delete('/:id',verifyTokenAndAdmin,deleteBook);

module.exports = router;