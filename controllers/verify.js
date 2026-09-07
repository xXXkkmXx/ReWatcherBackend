const verifyRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../schemas/userSchema");

verifyRouter.put("/:id",async (request,response,next)=>{
    const { password } = request.body;
    const user = await User.findById(request.params.id);

    const correctPassword = user == null ? false : await bcrypt.compare(password,user.Password);

    if(correctPassword){
        user.IsVerified = true;
    }else{
        return response.status(401).json({
            error: "Wrong password"
        });
    }
    
    const token = jwt.sign(
            userTokenLog,
            process.env.SECRET,
            {expiresIn: 60*60}
    );
    

    return user.save().then(()=>{
        response.sendStatus(202).send({
            username:user.Name,
            password:user.Password,
            token:token
        });
    });
})

module.exports = verifyRouter;