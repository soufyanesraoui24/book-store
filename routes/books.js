const express = require('express');
const Joi = require('joi');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {Book,validateCreateBook,validateUpdateBook} = require('../models/Book');
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken');

//http methods(verbs)
/**
 * @description get all books
 * @method GET
 * @Route /api/books
 * @access public
 */
router.get('/',asyncHandler(async(req,res)=>{
    const books = await Book.find().populate('author','_id firstName lastName');
    res.status(200).json(books);
}));

/**
 * @description get book by id
 * @method GET
 * @Route /api/books
 * @access public
 */
router.get('/:id',asyncHandler(async(req,res)=>{
    const book = await Book.findById(req.params.id).populate('author');
    if(!book){
        res.status(404).json({Message:'book not found'});
        return;
    }
    res.status(200).json(book);
}));

/**
 * @description create new book
 * @method Post
 * @Route /api/books
 * @access private (only admin can create book)
 */
router.post('/',verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
    
    const{error}=validateCreateBook(req.body);
    if(error){
        res.status(400).json({Message:error.details[0].message});
        return;
    }
    const book = new Book({
        title:req.body.title,
        author:req.body.author,
        cover:req.body.cover
    })

    const result = await book.save(book);
    res.status(201).json(result);

}));

/**
 * @description update book
 * @method put
 * @Route /api/books
 * @access private (only admin can update book)
 */
router.put('/:id',verifyTokenAndAdmin,asyncHandler(async(req,res)=>{
    const {error} = validateUpdateBook(req.body);
    if(error){
        res.status(400).json({Message:error.details[0].message});
        return;
    }
    const book = await Book.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        author:req.body.author,
        cover:req.body.cover
    },{new:true});
    if(!book){
        res.status(404).json({Message:'book not found'});
        return;
    }
    res.status(200).json(book);
}));
    
/**
 * @description delete book
 * @method delete
 * @Route /api/books
 * @access private (only admin can delete book)
 */
router.delete('/:id',verifyTokenAndAdmin ,asyncHandler(async(req,res)=>{
    const book = await Book.findByIdAndDelete(req.params.id);
    if(!book){
        res.status(404).json({Message:'book not found'});
        return;
    }
    res.status(200).json(book);
}));
module.exports = router;