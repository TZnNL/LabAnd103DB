const mongoose = require('mongoose')
const Scheme = mongoose.Schema

//tao collection users = table
const Users = new Scheme ({
    username: {type:String, unique: true,maxlength : 55},
    password: {type:String},
    email: {type:String, unique:true},
    name: {type:String},
    avatar: {type:String},
    age: {type:Number, min: 18, max: 65},
    available: {type:Boolean, default: false}

},{
    timestamps: true
})

module.exports = mongoose.model('user', Users)