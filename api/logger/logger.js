const db = require('../../data/dbConfig');

function logger(req, res, next) {
    //request method, request url, and a timestamp
    const method = req.method || GET;
    const url = req.url || "/";
    const time = Date.now();

    const decoded = req.decoded.id || 0;

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
  
module.exports = {
    logger
}  