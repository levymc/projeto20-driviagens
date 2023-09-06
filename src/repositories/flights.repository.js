import { db } from "../database/db.connection.js";
import httpStatus from "http-status";
import AppError from "../middlewares/errors/AppError.js";

export default class FlightsRepository {
    async postFlightDB(origin, destination, date) {
        const query = `
            insert into public.flights (origin, destination, date) values ($1, $2, $3) returning id
        `;
            const values = [origin, destination, date];
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            switch(error.code){
                case '08P01':
                    throw new AppError(error, 'SQLException PassengersRepository.postPassengerDB', httpStatus.INTERNAL_SERVER_ERROR)
                case '23503':
                    throw new AppError(error, `'origin' e 'destination' devem existir na tabela 'cities`, httpStatus.NOT_FOUND)
                default:
                    throw new AppError(error, "defaultError", httpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }    
}
