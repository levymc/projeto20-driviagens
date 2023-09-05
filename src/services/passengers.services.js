import { SQLException } from "../middlewares/errors/error.middleware.js";
import PassengersRepository from "../repositories/passengers.repository.js";

export default class PassengersServices {
    async handlePassengersRepository(req, res, next) {
        const passengersRepository = new PassengersRepository();
        try {
            res.responseDB = await passengersRepository.postPassengerDB(req.body.firstName, req.body.lastName)
            next()
        } catch (err) {
            const errorMessage = {
                name: "SQLException PassengersRepository.postPassengerDB",
                message: err.message,
            };
            throw new SQLException(errorMessage, req, res, next);
        }
    }    
}
