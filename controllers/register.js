const registerRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../schemas/userSchema");

registerRouter.post("/api/register", async (request,response)=>{
    const {name,email,password} = request.body;
    const saltRounds = 10;
    const hashedPswd = bcrypt.hash(password,saltRounds);

    const tmp = new User(
        {
            Name:name,
            Email:email,
            Password:hashedPswd
        }
    );

    const isExist = await User.findOne({Email:email});    
    
    if(isExist){
        return response.status(409).json({
            message: "user is already using this email"
        });
    }

    await tmp.save();
    response.status(201).json({
        message: "user created"
    });

})

module.exports = registerRouter