const changePswdRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../schemas/userSchema");

changePswdRouter.put("/:id", async (request,response,next)=>{
    const { password } = request.body;
    const saltRounds = 10;
    
    User.findById(request.param.id).then(
        async user=>{
            user.Password = await bcrypt.hash(password,saltRounds);
            return user.save.then(()=>{response.sendStatus(202)})
        } 
    ).catch(error => next(error));

})

module.exports = changePswdRouter;