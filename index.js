require("dotenv").config();

const PORT = process.env.PORT

const express = require("express");
const input = require("readline");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express();

const mongo = require("./utils/mongodb");
const emailSender = require("./utils/emailsender");
const User = require("./schemas/userSchema");
const registerRouter = require("./controllers/register");
const loginRouter = require("./controllers/login");
const verifyRouter = require("./controllers/verify");
const changeSenderRouter = require("./controllers/changesender");
const changePswdRouter = require("./controllers/changepswd");

mongo.Connect();

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));
app.use('/api/login',loginRouter);
app.use("/api/register",registerRouter);
app.use("/api/verify/",verifyRouter);
app.use("/api/changesender",changeSenderRouter);
app.use("/api/changepassword/",changePswdRouter);

const server = app.listen(PORT,()=>{
    console.log(`\x1b[32mServer is running on the port ${PORT}\x1b[00m`);
    setTimeout(()=>{HelpLog()},500);
    process.stdin.resume();
})

