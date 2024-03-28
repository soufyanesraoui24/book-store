const mongoose = require('mongoose');
const Joi= require('joi');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim: true,
        minlength:5,
        maxlength:50,
    },
    email:{
        type:String,
        required:true,
        trim: true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim: true,
        minlength:5,
        maxlength:1024
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},{timestamps:true});

//Generate token
userSchema.methods.generateAuthToken = function(){
    return token = jwt.sign({id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET);
}
const User = mongoose.model('User' ,userSchema);

function validateRegisterUser(user){
    const schema = Joi.object({
        username: Joi.string().trim().min(5).max(50).required(),
        email: Joi.string().trim().min(5).max(255).required().email(),
        password: Joi.string().trim().min(5).max(1024).required(),
    });
    return schema.validate(user);
}
function validateLoginUser(){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    });
    return schema.validate(user);
}
function validateUpdateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(5).max(50),
        email: Joi.string().min(5).max(255).email(),
        password: Joi.string().min(5).max(1024),
    });
    return schema.validate(user);
}

module.exports= {validateLoginUser,validateRegisterUser,validateUpdateUser, User };
