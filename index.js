require("dotenv").config();

const PORT = 3001

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const input = require("readline");


const server = app.listen(PORT,()=>{
    console.log(`\x1b[32mServer is running on the port ${PORT}\x1b[00m`);
    console.log("=========== h for help ============\n"+                    
                "'a' for the adding testing user\n" +
                "'d' for deleting him\n"+
                "'q' for quit a server"
            );
    process.stdin.resume();
})

mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URL,{family:4})

const userScheme = new mongoose.Schema({
    Name:String,
    Email:String,
    Password:String,
})

const User = mongoose.model('User',userScheme);

app.get("/", (request,response) =>{

})

app.get("/api/login", (request,response)=>{

})

app.post("/api/login", (request,response)=>{

})
app.post("/api/register", (request,response)=>{
    const name = "marcin";
    const password = "dfsjkxvncdhjgfdnjkgfnjkdgfnd";
    const email = "marcin@hotmail.com";
    const tmp = new User({Name:name,Email:email,Password:password});
    const isExist = false;
    User.find({}).then(result=>{
        result.forEach(user=>{
            if(email == user.Email || name == user.Name){
                isExist != isExist;
            }
        })
    }).then(()=>{
        if(isExist){
            console.log("\x1b[31mAccount already using this email");
        }else{
            tmp.save();
        }
    })
    mongoose.connection.close();
    console.log(response);
})

const ShutDownServer = () =>{
    server.close(()=>{
        console.log("server closed properly");
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
    const test = new User({
        Name:"Wojtasz",
        Email: "wojtasz@hotmail.com",
        Password:"uj8i9orfw3ewrujioaw4rf34rhjau8ji94rtui8904tweuji",
    });
    test.save().then(()=>{
        mongoose.connection.close();
    })
}

input.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on("keypress", (ch,key)=>{
    if(key){
        switch(key.name){
            case 'h':
                console.clear();
                console.log(
                    "=========== h for help ============\n"+
                    "'a' for the adding testing user\n" +
                    "'d' for deleting him\n"+
                    "'q' for quit a server"
                );
                break;
            case 'a':
                AddTestGuy();
                break;
            case 'q':
                ShutDownServer();
                break;
        }
    }
    
})
