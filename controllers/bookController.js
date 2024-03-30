const asyncHandler = require('express-async-handler');
const {Book,validateCreateBook,validateUpdateBook} = require('../models/Book');

/**
 * @description get all books
 * @method GET
 * @Route /api/books
 * @access public
 */
const getAllBooks= asyncHandler(async(req,res)=>{
    const {minPrice, maxPrice}= req.query;
    let books;
    if(minPrice && maxPrice){
        books = await Book.find({price:{ $gte:minPrice, $lt:maxPrice}})
        .populate('author','_id firstName lastName');
    }
    else{
        books = await Book.find().populate('author','_id firstName lastName');
    }
})

/**
 * @description get book by id
 * @method GET
 * @Route /api/books
 * @access public
 */

const getBookById = asyncHandler(async(req,res)=>{
    const book = await Book.findById(req.params.id).populate('author');
    if(!book){
        res.status(404).json({Message:'book not found'});
        return;
    }
    res.status(200).json(book);
})


/**
 * @description create new book
 * @method Post
 * @Route /api/books
 * @access private (only admin can create book)
 */

const createBook= asyncHandler(async(req,res)=>{
    
    const{error}=validateCreateBook(req.body);
    if(error){
        res.status(400).json({Message:error.details[0].message});
        return;
    }
    const book = new Book({
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        cover:req.body.cover
    })

    const result = await book.save(book);
    res.status(201).json(result);

})

/**
 * @description update book
 * @method put
 * @Route /api/books
 * @access private (only admin can update book)
 */

const updateBook = asyncHandler(async(req,res)=>{
    const {error} = validateUpdateBook(req.body);
    if(error){
        res.status(400).json({Message:error.details[0].message});
        return;
    }
    const book = await Book.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        cover:req.body.cover
    },{new:true});
    if(!book){
        res.status(404).json({Message:'book not found'});
        return;
    }
    res.status(200).json(book);
})
        
/**
 * @description delete book
 * @method delete
 * @Route /api/books
 * @access private (only admin can delete book)
 */

const deleteBook = asyncHandler(async(req,res)=>{
    const book = await Book.findByIdAndDelete(req.params.id);
    if(!book){
        res.status(404).json({Message:'book not found'});
        return;
    }
    res.status(200).json(book);
})


module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook

}