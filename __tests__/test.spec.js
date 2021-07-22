const server = require('../api/server');
const request = require('supertest');

describe("yipyip", () => {
    it("Should return Yip yip, Appa", (done) => {
        request(server).get('/')
            .set('Accept', 'text/html')
            .expect(200, done)
    })
})