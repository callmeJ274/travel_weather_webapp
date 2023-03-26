import { callServer } from '../src/client/js/apiCalls'

describe("Test API call", () => {
    it("Successful return data", async () => {
        const responseData = {
            userData: {
                departureDate: "2023-03-08",
                destinationCity: "London",
                returnDate: "2023-03-12",
                timeTo: 4,
                timeFrom: 0,
                tripDuration: 4,
                units: "M"
            }
        }
        const response = await callServer('callgeo', responseData)
        expect(response.geonames[0].countryName).toBe('United Kingdom')
    })

})
