const express = require('express');
const Joi = require('joi');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const {verifyTokenAndAdmin} = require('../middlewares/verifyToken');
const {Author, validateCreateAuthor, validateUpdateAuthor } = require('../models/Author');

/** 
 * @desc get all authors
 * @route api/authors
 * @method GET
 * @access public
 */
router.get('/', asyncHandler(async (req, res) => {
    const authors = await Author.find();
    res.status(200).json(authors);
}))

/** 
 * @desc get author by id
 * @route api/authors
 * @method GET
 * @access public
 */
router.get('/:id',asyncHandler(async (req, res) => {
        const author = await Author.findById(req.params.id);
        res.status(200).json(author)}));

/**
 * @description create new author
 * @method POST
 * @route /api/authors
 * @access private (only admin can create author)
 */
router.post('/',verifyTokenAndAdmin,asyncHandler( async (req, res) => {
    const { error } = validateCreateAuthor(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
        const author = new Author({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            Nationality: req.body.Nationality,
            image: req.body.image,
        }); 

    // save author
    const result= await author.save();
    res.status(201).json(result);
    }));

/**
 * @description update author
 * @method PUT
 * @route /api/authors/:id
 * @access private (only admin can update author)
 */
router.put('/:id',verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const { error } = validateUpdateAuthor(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    
        const author = await Author.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            Nationality: req.body.Nationality,
            image: req.body.image,
        }, { new: true });
        res.status(200).json(author);
    })
);

/**
 * @description delete author
 * @method DELETE
 * @route /api/authors/:id
 * @access private (only admin can delete author)
 */
router.delete('/:id',verifyTokenAndAdmin, asyncHandler(async (req, res) => {  
    const author = await Author.findByIdAndDelete(req.params.id);
    res.status(200).json(author);
})
);
//export router
module.exports = router;

    