import FlightsRepository from "../repositories/flights.repository.js";

export default class FlightsServices {
    async handleFlightsRepository(origin, destination, date) {
        const flightsRepository = new FlightsRepository();
        const responseDB = await flightsRepository.postFlightDB(origin, destination, date)
        return responseDB
    }    
}
