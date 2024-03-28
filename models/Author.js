const mongoose = require('mongoose');
const Joi = require('joi');

const authorSchema = new mongoose.Schema({  
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 200,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 200,
    },
    Nationality: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 200,
    },
    image: {
        type: String,
        default: 'default.jpg',
        
    },
   
}, {timestamps: true});

const Author = mongoose.model('Author', authorSchema);


//valideate create author
function validateCreateAuthor(obj){
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        Nationality: Joi.string().min(3).max(50).required(),
        image: Joi.string().min(3).max(50),
    });
    return schema.validate(obj);
}
// validate update author
function validateUpdateAuthor(obj){
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50),
        lastName: Joi.string().min(3).max(50),
        Nationality: Joi.string().min(3).max(50),
        image: Joi.string().min(3).max(50),
    });
    return schema.validate(obj);
}


module.exports = {
    Author, 
    validateCreateAuthor,
    validateUpdateAuthor,
    
};