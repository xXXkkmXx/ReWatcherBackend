const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../schemas/userSchema");

loginRouter.post("/api/login", async (request,response)=>{
    const {name,password} = request.body;
    const user = await User.findOne({name});
    
    const correctPassword = user == null 
        ? false 
        : await bcrypt.compare(password,user.Password);
    
    if(!(user && passwordCorrect)){
        return response.status(401).json({
            error: "Invalid username or password"
        })
    }
    
    const userTokenLog = {
        name: user.name,
        id: user._id
    }

    const token = jwt.sign(userTokenLog,process.env.SECRET);

    response
        .status(200)
        .send({token,name:user.Name});
})

module.exports = loginRouter