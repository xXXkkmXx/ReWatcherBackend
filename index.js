const PORT = 3001

const express = require("express");
const input = require("readline");
const app = express();

const mongo = require("./mongodb");
const User = require("./schemas/userSchema");

const server = app.listen(PORT,()=>{
    console.log(`\x1b[32mServer is running on the port ${PORT}\x1b[00m`);
    console.log("=========== h for help ============\n"+                    
                "'a' for the adding testing user\n" +
                "'d' for deleting him\n"+
                "'q' for quit a server"
            );
    process.stdin.resume();
})

const test = new User({
    Name:"Wojtasz",
    Email: "wojtasz@hotmail.com",
    Password:"uj8i9orfw3ewrujioaw4rf34rhjau8ji94rtui8904tweuji",
});

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
    mongo.Close();
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
    test.save().then(()=>{
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
            case 'd':
                break;
            case 'q':
                ShutDownServer();
                break;
        }
    }
    
})
