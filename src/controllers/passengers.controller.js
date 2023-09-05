import { SQLException } from "../middlewares/errors/error.middleware.js";
import PassengersServices from "../services/passengers.services.js";

export default class PassengersController {
    async handlePostPassenger(req, res) {
        const services = new PassengersServices()
        try{
            res.insertedId = await services.handlePassengersRepository(req.body.firstName, req.body.lastName)
            if(res.insertedId) res.status(201).send(res.insertedId)
            else res.status(404).send("Ocorreu algum erro")
        }catch (err) {
            const errorMessage = {
                name: "SQLException PassengersRepository.postPassengerDB",
                message: err.message,
            };
            throw new SQLException(errorMessage, req, res);
        }
    }
}
