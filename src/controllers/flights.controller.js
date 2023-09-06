import FlightsServices from "../services/flights.services.js";
import AppError from "../middlewares/errors/AppError.js";

export default class FlightsController {
    async handlePostFlight(req, res, next) {
        const services = new FlightsServices()
        try{
            res.insertedId = await services.handleFlightsRepository(req.body.origin, req.body.destination, req.body.date)
            if(res.insertedId) res.status(201).send(res.insertedId)
            else throw new AppError("Ocorreu algum erro", "ERROR", 404)
        } catch (err) {
            next(err)
        }
    }
    async handleGetFlights(req, res, next) {
        const services = new FlightsServices()
        try{
            res.flights = await services.handleGetFlightsRepository(req.query.origin, req.query.destination)
            if(res.flights) res.status(200).send(res.flights)
            else throw new AppError("Ocorreu algum erro", "ERROR", 404)
        } catch (err) {
            next(err)
        }
    }
}
