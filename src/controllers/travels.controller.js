import logger from "../config/logger.js";
import AppError from "../middlewares/errors/AppError.js";
import TravelsServices from "../services/travels.services.js";

export default class TravelsController {
    async handlePostTravel(req, res, next) {
        logger.info('TravelsController.handlePostTravel START')
        const services = new TravelsServices()
        try{
            res.insertedId = await services.handlTravelsRepository(req.body.passengerId, req.body.flightId)
            if(res.insertedId) {
                logger.info('TravelsController.handlePostTravel END')
                res.status(201).send(res.insertedId)
            }
            else throw new AppError("Ocorreu algum erro", "ERROR", 404)
        }catch (err) {
            next(err)
        }
    }
}
