import AppError from "../middlewares/errors/AppError.js";
import TravelsServices from "../services/travels.services.js";

export default class TravelsController {
    async handlePostTravel(req, res, next) {
        const services = new TravelsServices()
        try{
            res.insertedId = await services.handlTravelsRepository(req.body.passengerId, req.body.flightId)
            if(res.insertedId) res.status(201).send(res.insertedId)
            else throw new AppError("Ocorreu algum erro", "ERROR", 404)
        }catch (err) {
            next(err)
        }
    }
}
