const express = require('express');

const ipSourceRouter = require('../routes/ipsource-routes');

const server = express();
server.use(express.json());
server.use("/api/ipsource", ipSourceRouter);

server.get("/", (req,res) => {
    res.json({message: "Yip, yip, Appa!"});
})



module.exports = server;