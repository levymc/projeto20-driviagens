import PassengersRepository from "../repositories/passengers.repository.js";

export default class PassengersController {

    async handlePostPassenger(req, res) {
        const passengersRepository = new PassengersRepository();
        const insertedId = await passengersRepository.postPassengerDB(req.body.firstName, req.body.lastName)
        console.log(insertedId)
        if(insertedId) res.status(201).send(insertedId)
    }
}
