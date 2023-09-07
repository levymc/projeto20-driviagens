import FlightsRepository from "../repositories/flights.repository.js";
import AppError from "../middlewares/errors/AppError.js";
import httpStatus from "http-status";
import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';


export default class FlightsServices {
    constructor() {
        this.flightsRepository = new FlightsRepository();
    }

    async handleGetFlightsRepository(originName = null, destinationName = null, biggerDate = null, smallerDate = null){
        await this.checkBiggerAndSmallerDate(biggerDate, smallerDate)
        const data = await this.flightsRepository.getFlights(originName, destinationName, biggerDate, smallerDate)
        return data
    }

    async checkBiggerAndSmallerDate(biggerDate, smallerDate){
        if ((biggerDate === null && smallerDate != null) || (biggerDate != null && smallerDate === null) ) {
            throw new AppError(`para bucar por período, a data inicial e final devem ser inseritdas`, 'bigger-date, smaller-date error', httpStatus.UNPROCESSABLE_ENTITY)
        }
    }

    async handleFlightsRepository(origin, destination, date) {
        this.checkOriginAndDestination(origin, destination)
        this.checkDate(date)
        const responseDB = await this.flightsRepository.postFlightDB(origin, destination, date)
        return responseDB
    }    

    checkOriginAndDestination(origin, destination){
        if (origin === destination) throw new AppError(`'origin' e 'destination' devem ser diferentes`, 'postFlight ERROR', httpStatus.CONFLICT)
    }

    checkDate(date){
        dayjs.extend(isSameOrAfter);
        const dateNow = dayjs().format('DD-MM-YYYY')
        const convertedDate = dayjs(date, 'DD-MM-YYYY')
    
        if (!convertedDate.isSameOrAfter(dateNow)) {
            throw new AppError('a data fornecida é anterior à data atual.', 'postFlight ERROR', httpStatus.UNPROCESSABLE_ENTITY)
        }
    }
}
