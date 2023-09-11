import httpStatus from "http-status";
import AppError from "../middlewares/errors/AppError.js";
import PassengersServices from "../services/passengers.services.js";

export default class PassengersController {
    async handlePostPassenger(req, res, next) {
        const services = new PassengersServices()
        try{
            res.insertedId = await services.handlePassengersRepository(req.body.firstName, req.body.lastName)
            if(res.insertedId) res.status(201).send(res.insertedId)
        }catch (err) {
            next(err)
        }
    }

    async passengersTravels(req, res, next){
        
        
        const services = new PassengersServices()
        try{
            if (isNaN(req.query.page) || req.query.pagepage <= 0) throw new AppError('O valor de page está errado, deve ser um inteiro e maior ou igual a zero', 'Invalid page value', httpStatus.BAD_GATEWAY);
            const page = !isNaN(req.query.page) ? parseInt(req.query.page) : 0
            const name = req.query.name ? req.query.name : null
            const passengersTravelsList = await services.handlePassangersTravels(page, name)
            res.status(201).send(passengersTravelsList)
        }catch (err) {
            next(err)
        }
    }
}
