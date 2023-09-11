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

    async checkBiggerAndSmallerDate(biggerDate, smallerDate) {
        if ((biggerDate === null && smallerDate !== null) || (biggerDate !== null && smallerDate === null)) {
          throw new AppError(`Para buscar por período, a data inicial e final devem ser inseridas`, 'bigger-date, smaller-date error', httpStatus.UNPROCESSABLE_ENTITY);
        }
      
        const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
        if (!datePattern.test(biggerDate) || !datePattern.test(smallerDate)) {
            throw new AppError(`Formato de data inválido. Use o formato 'DD-MM-YYYY'`, 'bigger-date, smaller-date error', httpStatus.UNPROCESSABLE_ENTITY);
        }
    
        let splitedDate1 = await this.splitDate(biggerDate);
        let splitedDate2 = await this.splitDate(smallerDate);

        if (splitedDate1.year < splitedDate2.year) {
            console.log(`${biggerDate} < ${smallerDate} (year)`);
            throw new AppError(`${biggerDate} é menor do que ${smallerDate}`, 'bigger-date, smaller-date error', httpStatus.BAD_REQUEST);
        } else if (splitedDate1.year === splitedDate2.year) {
            if (splitedDate1.month < splitedDate2.month) {
                console.log(`${biggerDate} < ${smallerDate} (month)`);
                throw new AppError(`${biggerDate} é menor do que ${smallerDate}`, 'bigger-date, smaller-date error', httpStatus.BAD_REQUEST);
            } else if (splitedDate1.month === splitedDate2.month) {
                if (splitedDate1.day < splitedDate2.day) {
                    console.log(`${biggerDate} < ${smallerDate} (day)`);
                    throw new AppError(`${biggerDate} é menor do que ${smallerDate}`, 'bigger-date, smaller-date error', httpStatus.BAD_REQUEST);
                }
            }
        }

    }

    async splitDate(dateStr){
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);
            return {year, month, day};
        }
        return null;
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
            throw new AppError('A data fornecida é anterior à data atual.', 'postFlight ERROR', httpStatus.UNPROCESSABLE_ENTITY)
        }
    }
}
