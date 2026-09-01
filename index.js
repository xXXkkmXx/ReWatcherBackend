require("dotenv").config();

const PORT = process.env.PORT

const express = require("express");
const input = require("readline");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();

const mongo = require("./middleware/mongodb");
const emailSender = require("./middleware/emailsender");
const User = require("./schemas/userSchema");
const registerRouter = require("./controllers/register");
const loginRouter = require("./controllers/login");

mongo.Connect();

const HelpLog = () => {
    console.log(
        "=========== h for help ============\n"+                    
        "'q' for close quit a server",
        "\n's' for send template email"
    );
}

app.use(express.json());
app.use(cors());
app.use('/api/login',loginRouter);
app.use("/api/register",registerRouter);

const server = app.listen(PORT,()=>{
    console.log(`\x1b[32mServer is running on the port ${PORT}\x1b[00m`);
    setTimeout(()=>{HelpLog()},500);
    process.stdin.resume();
})

const ShutDownServer = () =>{
    server.close(()=>{
        console.log("server closed properly");
        mongo.Close();
        process.exit(0);
    });
    setTimeout(() => {
        console.error("\x1b[31mForcing server to shutdown after timeout");
        if(server.closeAllConnections){
            server.closeAllConnections();
        }
        process.exit(1);
    },5000)

}

input.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (ch,key)=>{
    if(key){
        switch(key.name){
            case 'h':
                console.clear();
                HelpLog();
                break;
            case 'b':
                emailSender.sendMail("Hello my friend","jamax382@gmail.com","djksadjksajda",emailSender.mailFormula("max kow",3288382890));
                break;
            case 'q':
                ShutDownServer();
                break;
        }
    }
    
})
