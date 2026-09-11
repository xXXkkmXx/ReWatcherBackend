const changeSenderRouter = require("express").Router();

const EmailSender = require("../utils/emailsender");
const User = require("../schemas/userSchema");

changeSenderRouter.post("/",async (request,response)=>{
    const {email} =  request.body;
    const user = await User.findOne({Email:email});

    if(user){
        EmailSender.sendMail(user.Email,"Changing a password",EmailSender.mailFormulaChange(user.Name,user.id))
        return response.status(200)
    }else{
        return response.status(404).json({
            error:"Can't find a account acciocated with this email"
        });
    }

})

module.exports = changeSenderRouter;