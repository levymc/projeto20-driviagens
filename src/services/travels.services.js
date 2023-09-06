import TravelsRepository from "../repositories/travels.repository.js";
import AppError from "../middlewares/errors/AppError.js";
import httpStatus from "http-status";


export default class TravelsServices {
    constructor() {
        this.travelsRepository = new TravelsRepository();
    }
    async handlTravelsRepository(passengerId, flightId) {
        const responseDB = await this.travelsRepository.postTravelDB(passengerId, flightId)
        return responseDB
    }    

}
