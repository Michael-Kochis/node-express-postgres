const jwt = require('jsonwebtoken');

function getUserID(req, res, next) {
    let neoID =0 
    if (req) {
        if (req.headers && req.headers.authorization) {
            const token = req.headers.authorization;
            const secret = process.env.TOKEN_SECRET;
        
            if (token) {
                jwt.verify(token, secret, (err, decoded) => {
                    if (err) {
                        res.status(401).json({ message: "auth token corrupted or expired"})
                    } else {
                        neoID = decoded.id;
                    }
                })
            } 
        } 
    }
    return neoID;
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    const secret = process.env.TOKEN_SECRET;

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "auth token corrupted or expired"})
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else { 
        res.status(401).json({ message: "improper or expired auth token"})
    }
}

module.exports = {
    getUserID,
    verifyToken
}