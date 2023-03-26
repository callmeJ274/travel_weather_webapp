const app = require('../src/server/server')
const supertest = require('supertest')
const request = supertest(app)

describe("Tests the storeData function", () => {

    it("Return message if successfully restore data", async () => {
        const response = await request.post('/storedata', "testData")
        expect(response.body.message).toBe("Data received and stored")
    })

    it("Response data successfully: OK 200", async () => {
        const response = await request.post('/storedata', "testData")
        expect(response.status).toBe(200)
    })
})