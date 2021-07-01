const knex = require('knex');
const config = require('../knexfile');

const db = knex(config.development);

module.exports = {
    addIPSource,
    findIPSourceByID,
    findIPSourceByName,
    getAllIPSource,
    removeIPSource,
    modifyIPSource
}

//add
async function addIPSource(neoSource) {
    neoSource.sourceID = Date.now();
    const [sourceID] = await db("ipsource").insert(neoSource);
    return neoSource;
}

//delete
async function removeIPSource(key) {
    return await db("ipsource")
        .where({sourceID: key}).first()
        .del();
}

//find
async function getAllIPSource() {
    return await db("ipsource");
}

//findbyID
async function findIPSourceByID(key) {
    key = parseInt(key);
    return await db("ipsource")
        .where({sourceID: key})
        .first();
}

async function findIPSourceByName(key) {
    return await db("ipsource")
        .where({sourcename: key})
        .first();
}

//update
async function modifyIPSource(key, changes) {
    key = parseInt(key);
    console.log(changes);
    return await db("ipsource")
        .where({sourceID: key})
        .update(changes)
        .then(() => {
            return findIPSourceByID(key);
        })
}