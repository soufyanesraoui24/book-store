const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true,
        minlength: 5,
        maxlength: 50
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author',
        trim:true,
        minlength: 5,
        maxlength: 50   
    },
    price: {
        type: Number,
        required: true,
    },
    cover: {
        type: String,
        required: true,
        enum: ['soft', 'hard'],
    }
},{timestamps:true});
const Book = mongoose.model('Book', bookSchema);


//valideate create Book
function validateCreateBook(obj){
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        author: Joi.string().min(5).max(50).required(),
        price: Joi.number().required(),
        cover: Joi.string().valid('soft', 'hard').required(),

        
    });
    return schema.validate(obj);
}
// validate update Book
function validateUpdateBook(obj){
    const schema = Joi.object({
       
        title: Joi.string().min(5).max(50),
        author: Joi.string().min(5).max(50),
        price: Joi.number(),
        cover: Joi.string().valid('soft', 'hard'),
    });
    return schema.validate(obj);
}

module.exports = {
    validateCreateBook,
    validateUpdateBook,
    Book
};
