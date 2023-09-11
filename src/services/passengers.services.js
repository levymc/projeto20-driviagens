import AppError from "../middlewares/errors/AppError.js";
import PassengersRepository from "../repositories/passengers.repository.js";
import httpStatus from "http-status";

export default class PassengersServices {
    async handlePassengersRepository(firstName, lastName) {
        const passengersRepository = new PassengersRepository();
        const responseDB = await passengersRepository.postPassengerDB(firstName, lastName)
        return responseDB
    }    

    async handlePassangersTravels(page, name){
        const passengersRepository = new PassengersRepository();
        const { responseDB, rowCount } = await passengersRepository.getPassengersTravels(page, name)
        if (rowCount > 10) throw new AppError('A requisição excedeu 10 linhas, aprimore o filtro', 'Too many requests', httpStatus.INTERNAL_SERVER_ERROR)        
        return responseDB
    }
}
