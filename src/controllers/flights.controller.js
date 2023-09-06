import { MyException } from "../middlewares/errors/error.middleware.js";
import FlightsServices from "../services/flights.services.js";

export default class FlightsController {
    async handlePostFlight(req, res, next) {
        const services = new FlightsServices()
        try{
            res.insertedId = await services.handleFlightsRepository(req.body.origin, req.body.destination, req.body.date)
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
