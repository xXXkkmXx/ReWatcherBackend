require("dotenv").config();

const PORT = process.env.PORT

const express = require("express");
const input = require("readline");
const bcrypt = require("bcrypt")
const app = express();

const mongo = require("./middleware/mongodb");
const User = require("./schemas/userSchema");
const registerRouter = require("./controllers/register");
const loginRouter = require("./controllers/login");

mongo.Connect();

const HelpLog = () => {
    console.log(
        "=========== h for help ============\n"+                    
        "'a' for the adding testing user\n" +
        "'d' for deleting him\n"+
        "'q' for close quit a server"
    );
}

const server = app.listen(PORT,()=>{
    console.log(`\x1b[32mServer is running on the port ${PORT}\x1b[00m`);
    setTimeout(()=>{HelpLog()},500);
    process.stdin.resume();
})

const test = new User({
    Name:"Wojtasz",
    Email: "wojtasz@hotmail.com",
    Password:"uj8i9orfw3ewrujioaw4rf34rhjau8ji94rtui8904tweuji",
});

app.get("/", (request,response) =>{})
app.use('api/login',loginRouter);
app.use("api/register",registerRouter);

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

const AddTestGuy = () => {
    test.save().then(()=>{
        mongo.Close();
    })
}

const DeleteTestGuy = () =>{
    User.findOneAndDelete({Email:"wojtasz@hotmail.com"}).then(()=>{
        mongo.Close();
    })
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
            case 'a':
                AddTestGuy();
                break;
            case 'd':
                DeleteTestGuy();
                break;
            case 'q':
                ShutDownServer();
                break;
        }
    }
    
})
