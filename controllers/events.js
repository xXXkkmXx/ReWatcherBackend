const jwt = require("jsonwebtoken")
const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");

const getTokenForm = request =>{
    const authorization = request.get("authorization");
}
