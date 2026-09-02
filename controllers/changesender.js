const changeSenderRouter = require("express").Router();

const EmailSender = require("../utils/emailsender");
const User = require("../schemas/userSchema");

changeSenderRouter.post("/",(request,response)=>{
    const {email} =  request.body;

    User.findOne({Email:email}).then((user)=>{
        return response.status(200).then(
            EmailSender.sendMail(user.Email,"Changing a password",EmailSender.mailFormulaChange(user.Name,user.id))
        )
    }).catch((err)=>{
        return response.status(404).json({
            error: err
        })
    })
})

module.exports = changeSenderRouter;