import PassengersRepository from "../repositories/passengers.repository.js";

export default class PassengersServices {
    async handlePassengersRepository(firstName, lastName) {
        const passengersRepository = new PassengersRepository();
        const responseDB = await passengersRepository.postPassengerDB(firstName, lastName)
        return responseDB
    }    

    async handlePassangersTravels(){
        const passengersRepository = new PassengersRepository();
        const responseDB = await passengersRepository.getPassengersTravels()
        return responseDB
    }
}
