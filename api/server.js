const express = require('express');
const cors = require('cors');

const authRouter = require('./auth/auth-routes')
const ipSourceRouter = require('../routes/ipsource-routes');
const userRouter = require('../routes/user-routes');

const server = express();
server.use(express.json() );
server.use(cors() );

server.use("/api/auth", authRouter);
server.use("/api/ipsource", ipSourceRouter);
server.use("/api/users", userRouter);

server.get("/", (req,res) => {
    res.json({message: "Yip, yip, Appa!"});
})



module.exports = server;