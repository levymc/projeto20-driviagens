import PassengersRepository from "../repositories/passengers.repository.js";

export default class PassengersServices {
    async handlePassengersRepository(req, res, next) {
        const passengersRepository = new PassengersRepository();
        res.insertedId = await passengersRepository.postPassengerDB(req.body.firstName, req.body.lastName)
        console.log(res.insertedId)

        next()
    }    
}
