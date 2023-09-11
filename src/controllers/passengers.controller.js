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
        const page = req.query.page ? parseInt(req.query.page) : 0
        const name = req.query.name ? req.query.name : null
        const services = new PassengersServices()
        try{
            const passengersTravelsList = await services.handlePassangersTravels(page, name)
            res.status(201).send(passengersTravelsList)
        }catch (err) {
            next(err)
        }
    }
}
