const { default: mongoose } = require("mongoose")
const mongo = require("mongoose")

const userScheme = new mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
})

module.exports = mongo.model('User',userScheme)
