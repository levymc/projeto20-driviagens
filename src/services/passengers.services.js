import PassengersRepository from "../repositories/passengers.repository.js";

export default class PassengersServices {
    async handlePassengersRepository(firstName, lastName) {
        const passengersRepository = new PassengersRepository();
        responseDB = await passengersRepository.postPassengerDB(firstName, lastName)
        return responseDB
    }    
}
