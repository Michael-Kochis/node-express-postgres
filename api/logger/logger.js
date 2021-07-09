const db = require('../../data/dbConfig');
const jwt = require('jsonwebtoken');

function logger(req, res, next) {
    //request method, request url, and a timestamp
    if (req) {
        const method = req.method || GET;
        const url = req.url || "/";
        const time = Date.now();

        let decoded = 0;
        if (req) {
            if (req.headers && req.headers.authorization) {
                const token = req.headers.authorization;
                const secret = process.env.TOKEN_SECRET;
            
                if (token) {
                    jwt.verify(token, secret, (err, decoded) => {
                        if (err) {
                            res.status(401).json({ message: "auth token corrupted or expired"})
                        } else {
                            decoded = decoded.id;
                        }
                    })
                } 
            }
        }

        const neoLogMessage = {
            id: Date.now(),
            who: decoded,
            when: time,
            what: method,
            where: url
        }

        return db('logs')
        .insert(neoLogMessage)
        .then(() => {
            next();
        }).catch(next);
    } 
    next();
}
  
module.exports = {
    logger
}  