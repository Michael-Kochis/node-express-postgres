const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    const secret = process.env.TOKEN_SECRET;

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: "auth token corrupted or expired"})
            } else {
                req.decoded = decoded;
                console.log("Verify: ", decoded);
                next();
            }
        })
    } else { 
        res.status(401).json({ message: "improper or expired auth token"})
    }
}

module.exports = {
    verifyToken
}