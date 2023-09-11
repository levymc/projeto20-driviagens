import CitiesServices from "../services/cities.services.js";
import AppError from "../middlewares/errors/AppError.js";
import logger from "../config/logger.js";

export default class CitiesController {
    async handlePostPassenger(req, res, next) {
        logger.info('CitiesController.handlePostPassenger START')
        const services = new CitiesServices()
        try{
            res.insertedId = await services.handleCitiesRepository(req.body.name)
            logger.info('CitiesController.handlePostPassenger END')
            if(res.insertedId) res.status(201).send(res.insertedId)
            else throw new AppError("Ocorreu algum erro", "ERROR", 404)
        }catch (err) {
            next(err)
        }
    }
}
