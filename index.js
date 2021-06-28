const express = require('express');

const server = express();
server.use(express.json());
const PORT = 5000;

const fakeIPSource = [];

const sayHello = () => {
    console.log(`server is listening on port: ${PORT}`);
}

server.get("/", (req,res) => {
    res.json({message: "Yip, yip, Appa!"});
})

server.get("/api/ipsource/:id", (req, res) => {
    const {id} = req.params;
    let unit = fakeIPSource.find(record => record.sourceID === id);
    res.status(200).json(id);
})

server.get("/api/ipsource", (req, res) => {
    res.status(201).json(fakeIPSource);
})

server.post("/api/ipsource", (req, res) => {
    let neoSource = {
         sourcename: req.body.sourcename,
         sourceID: fakeIPSource.length 
    }
    fakeIPSource.push(neoSource);
    res.status(201).json(neoSource);
})

server.listen(PORT, sayHello);