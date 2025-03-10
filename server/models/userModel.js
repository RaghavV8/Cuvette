const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {ObjectId} = mongoose.Schema;

const jobHistorySchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },
    description: {
        type: String,
        trim: true,
    },
    salary: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
    },
    intervieDate:{
            type: Date,
    },
    applicationStatus:{
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
},{timestamps:true})

const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'last name is required'],
        maxlength: 32,
    },
    email:{
        type:String,
        trim:true,
        required:[ true, 'email is required'],
        unique:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
     password:{
        type:String,
        trim:true,
        required:[ true, 'password is required'],
        minlength: [6, "password must have atleast (6) characters"],
     },

     jobHistory: [jobHistorySchema],

     role:{
        type:Number,
        default:0
     }
},{timestamps:true})

//encrypt password before saving
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10)
})

// method to compare user password 
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

//return a JWT token 
userSchema.methods.getJwtToken = function (){
    //JWT_SECRET is a randomg string
    //Note that Cookie and token expiration should be the same 
    return jwt.sign({id: this.id}, process.env.JWT_SECRET,{
        expiresIn: 3600
    });
}

module.exports =  mongoose.model("User", userSchema);