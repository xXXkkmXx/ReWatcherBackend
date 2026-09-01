const registerRouter = require("express").Router();
const bcrypt = require("bcrypt");

const User = require("../schemas/userSchema");
const EmailSender = require("../middleware/emailsender");

registerRouter.post("/", async (request,response)=>{
    const {name,email,password} = request.body;
    const saltRounds = 10;
    const hashedPswd = await bcrypt.hash(password,saltRounds);

    const tmp = new User(
        {
            Name:name,
            Email:email,
            Password:hashedPswd,
            IsVerified:false
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
        message: "user created",
        user: tmp
    }).then(EmailSender.sendMail(`Hello mr/mr.s ${tmp.Name} your ID is ${tmp.id}`,tmp.Email,"test"));

})

module.exports = registerRouter