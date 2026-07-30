require("dotenv").config();

const URL = process.env.MONGO_URL 
const mongo = require('mongoose')

const Connect = () =>{
    mongo.set('strictQuery',false);
    mongo.connect(process.env.MONGO_URL,{family:4})
}


const Close = () =>{
    mongo.connection.close();
}

module.exports = {Connect,Close};