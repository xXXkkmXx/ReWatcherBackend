require("dotenv").config();

const mongoose = require('mongoose')
const User = require("../schemas/userSchema")

const Connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

const Close = async () =>{
    await mongoose.connection.close();
}

const FetchData = async () =>{
    return User.find({});
}

module.exports = {Connect,Close,FetchData};