const db = require('../../data/dbConfig');

function logger(req, res, next) {
    //request method, request url, and a timestamp
    if (req) {
        const method = req.method || GET;
        const url = req.url || "/";
        const time = Date.now();

        let decoded = 0;
        if (req && req.decoded) {
            decoded = req.decoded.id;
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