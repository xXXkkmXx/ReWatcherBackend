const nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const TOKEN = process.env.EMAIL_TOKEN;

const transporter = nodemailer.createTransport(
    MailtrapTransport({
        token: TOKEN
    })
);

const sender = {
    address: "no-reply@re-watcher.com",
    name: "ReWatcher Group"
}

const sendMail = (receiver,subject,htmlView) =>{
    return transporter.sendMail({
        from: sender,
        to: receiver,
        subject: subject,
        html:htmlView
    }).then(console.log, console.error);
}

const mailFormulaVer = (User,ID) =>{
    return `<!DOCTYPE html>
    <html>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap');
    </style>
    <body style="background-color:#141414;
    color:#D2D2FA;
    text-align:center;
    font-family:'Montenegrin Gothic One',serif">
    <p><strong style="font-size:7vw">Hello ${User}</strong></p>
    <p style="font-size:2.5vw">Here's verification for your account</p>
    <a href="re-watcher.com/verify/${ID}}"><button style="background-color:#D2D2FA;
                    border:none;
                    width:16vw;
                    height:7vh;
                    border-radius:.5dvh;
                    font-size:3.2vw;
                    color:#141414;
                    margin-bottom:1vh;
                    cursor: pointer">
        Verify
    </button></a>
    </body>
    </html>`;
}
const mailFormulaChange = (User,ID) =>{
    return `<!DOCTYPE html>
    <html>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap');
    </style>
    <body style="background-color:#141414;
    color:#D2D2FA;
    text-align:center;
    font-family:'Montenegrin Gothic One',serif">
    <p><strong style="font-size:7vw">Hello ${User}</strong></p>
    <p style="font-size:2.5vw">Click this button for the change password</p>
    <a href="re-watcher.com/changepassword/${ID}}"><button style="background-color:#D2D2FA;
                    border:none;
                    width:16vw;
                    height:7vh;
                    border-radius:.5dvh;
                    font-size:3.2vw;
                    color:#141414;
                    margin-bottom:1vh;
                    cursor: pointer">
        Verify
    </button></a>
    </body>
    </html>`;
}

module.exports = {sendMail,mailFormulaVer,mailFormulaChange}