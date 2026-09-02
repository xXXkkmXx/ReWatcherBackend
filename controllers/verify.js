const verifyRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../schemas/userSchema");

verifyRouter.put("/:id",async (request,response,next)=>{
    const { password } = request.body;
    const user = User.findById(request.param.id);

    if(await bcrypt.compare(user.Password,password)){
        user.isVerified = true;
    }else{
        return response.status(401).json({
            error: "Wrong password"
        });
    }

    return user.save().then(()=>{
        response.status(202)
    });
})

module.exports = verifyRouter;