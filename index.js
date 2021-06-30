const express = require('express');

const server = express();
server.use(express.json());
const PORT = 5000;

const ipsource = require("./models/dbhelpers");

const sayHello = () => {
    console.log(`server is listening on port: ${PORT}`);
}

server.delete("/api/ipsource/:id", (req, res) => {
    const { id } = req.params;
    ipsource.removeIPSource(id)
        .then((result) => {
            if (result > 0) {
                res.status(201).json(result);
            } else {
                res.status(404).json({message: "no such record found."});
            }
        }).catch(() => {
            res.status(500).json({
                message: "Undefined error on server."
            })
        })
})

server.get("/", (req,res) => {
    res.json({message: "Yip, yip, Appa!"});
})

server.get("/api/ipsource/:id", (req, res) => {
    const {id} = req.params;
    ipsource.findIPSourceByID(id)
        .then((response) => {
            if (response) {
                res.status(201).json(response);
            } else {
                res.status(404).json({message: "no such record found"});
            }
        }).catch(() => {
            res.status(500).json({
                message: "Undefined error on server."
            })
        })
})

server.get("/api/ipsource", (req, res) => {
    ipsource.getAllIPSource()
        .then(data => {
            res.status(201).json(data);
        }).catch(() => {
            res.status(500).json({
                message: "Undefined error on server."
            })
        })
})

server.post("/api/ipsource", (req, res) => {
    ipsource.addIPSource(req.body)
        .then((source) => {
            res.status(201).json(source);
        }).catch(() => {
            res.status(500).json({
                message: "Undefined error on server."
            })
        })
})

server.put("/api/ipsource/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    ipsource.modifyIPSource(id, changes)
        .then((result) => {
            if (result) {
                res.status(201).json(result);
            } else {
                res.status(404).json({message: "no such record found"});
            }
        }).catch(() => {
            res.status(500).json({
                message: "Undefined error on server."
            })
        })

})

server.listen(PORT, sayHello);