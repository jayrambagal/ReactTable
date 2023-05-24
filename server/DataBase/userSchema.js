const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    id:Number,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    avatar: String,
    status:String,
    last_login: String,
    role: String
    
})

module.exports = mongoose.model('user',userSchema)