require("dotenv").config();
const server = require('./api/ipserver');

if (process.env.DATABASE_URL) {
    pg.defaults.ssl = {
        rejectUnauthorized: false
    }
}

const port = process.env.PORT || 6000;

const sayHello = () => {
    console.log(`server is listening on port: ${port}`);
}

server.listen(port, sayHello);