const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../schemas/userSchema");

loginRouter.post("/", async (request,response)=>{
    const {username,password} = request.body;
    const user = await User.findOne({Name:username});

    const correctPassword = user == null 
        ? false 
        : await bcrypt.compare(password,user.Password);
    
    if(!(user && correctPassword)){
        return response.status(401).json({
            error: "Invalid username or password"
        })
    }
    
    const userTokenLog = {
        username: user.name,
        id: user._id
    }

    const token = jwt.sign(
        userTokenLog,
        process.env.SECRET,
        {expiresIn: 60*60}
    );

    response
        .status(200)
        .send({
            username:user.Name,
            password:user.Password,
            token:token
        });
})

module.exports = loginRouter