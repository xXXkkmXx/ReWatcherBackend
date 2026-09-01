const mongo = require("mongoose")

const userScheme = new mongo.Schema({
    Name:String,
    Email:String,
    Password:String,
    IsVerified:Boolean
})

module.exports = mongo.model('User',userScheme)
