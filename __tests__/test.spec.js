import { it } from '@jest/globals'
import { describe } from 'yargs'
import server from '../api/server'

describe("yipyip", () => {
    it("Should return Yip yip, Appa", () => {
        expect(server()).toBe("Yip yip, Appa!");
    })
})