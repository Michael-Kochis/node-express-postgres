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
    const unit = fakeIPSource.find(record => record.sourceID === Number.parseInt(id));
    
    res.status(200).json(unit);
})

server.get("/api/ipsource", (req, res) => {
    res.status(201).json(fakeIPSource);
})

server.post("/api/ipsource", (req, res) => {
    let neoSource = {
         sourcename: req.body.sourcename,
         sourceID: Date.now()
    }
    fakeIPSource.push(neoSource);
    res.status(201).json(neoSource);
})

server.put("/api/ipsource/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    let unit = fakeIPSource.find(record => record.sourceID === Number.parseInt(id));
    if (unit) {
        unit = { ...unit,
            ...changes}
        const index = fakeIPSource.findIndex(record => record.sourceID === Number.parseInt(id));
        fakeIPSource[index] = unit;
        res.status(201).json(unit);
    } else {
        res.status(404).json({message: "Requested item does not exist."})
    }
})

server.listen(PORT, sayHello);