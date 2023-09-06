import { MyException } from "../middlewares/errors/error.middleware.js";
import CitiesServices from "../services/cities.services.js";
import httpStatus from "http-status";

export default class CitiesController {
    async handlePostPassenger(req, res, next) {
        const services = new CitiesServices()
        try{
            res.insertedId = await services.handleCitiesRepository(req.body.name)
            if(res.insertedId) res.status(201).send(res.insertedId)
            else {
                err.status = 404
                err.message = "Ocorreu algum erro"
                next(err)
            }
        }catch (err) {
            next(err)
        }
    }
}