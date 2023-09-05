import { MyException } from "../middlewares/errors/error.middleware.js";
import PassengersServices from "../services/passengers.services.js";

export default class PassengersController {
    async handlePostPassenger(req, res, next) {
        const services = new PassengersServices()
        try{
            res.insertedId = await services.handlePassengersRepository(req.body.firstName, req.body.lastName)
            if(res.insertedId) res.status(201).send(res.insertedId)
            else {
                err.status = 404
                err.message = "Ocorreu algum erro"
                throw new MyException(err, req, res, next)
            }
        }catch (err) {
            next(err)
        }
    }
}
