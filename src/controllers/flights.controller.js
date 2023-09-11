import FlightsServices from "../services/flights.services.js";
import AppError from "../middlewares/errors/AppError.js";
import logger from "../config/logger.js";

export default class FlightsController {
    async handlePostFlight(req, res, next) {
        logger.info('FlightsController.handlePostFlight START')
        try{
            const services = new FlightsServices()
            res.insertedId = await services.handleFlightsRepository(req.body.origin, req.body.destination, req.body.date)
            if(res.insertedId) {
                res.status(201).send(res.insertedId)
                logger.info('FlightsController.handlePostFlight END')
            }
            else throw new AppError("Ocorreu algum erro", "ERROR", 404)
        } catch (err) {
            next(err)
        }
    }
    async handleGetFlights(req, res, next) {
        logger.info('FlightsController.handleGetFlights START')
        const services = new FlightsServices()
        try{
            const biggerDate = req.query['bigger-date'];
            const smallerDate = req.query['smaller-date'];
            res.flights = await services.handleGetFlightsRepository(req.query.origin, req.query.destination, biggerDate, smallerDate )
            if(res.flights) {
                res.status(200).send(res.flights)
                logger.info('FlightsController.handleGetFlights END')
            }
            else throw new AppError("Ocorreu algum erro", "ERROR", 404)
        } catch (err) {
            next(err)
        }
    }
}
