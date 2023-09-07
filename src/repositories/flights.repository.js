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
                    throw new AppError(error.detail, 'SQLException FlightsRepository.postFlightDB', httpStatus.INTERNAL_SERVER_ERROR)
                case '23503':
                    throw new AppError(error.detail, `'origin' e 'destination' devem existir na tabela 'cities`, httpStatus.NOT_FOUND)
                default:
                    throw new AppError(error.detail, "defaultError", httpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }    

    async getFlights(originName, destinationName){
        let query = `
            select * from public.flights
        `;

        if (originName && destinationName) query += ` where origin = (select id from public.cities where name ilike '%${originName}%')
                                                and destination = (select id from public.cities where name ilike '%${destinationName}%') `
        if (originName && destinationName === null) query += ` where origin = (select id from public.cities where name ilike '%${originName}%') `
        if (destinationName && originName === null) query += ` where destination = (select id from public.cities where name ilike '%${destinationName}%') `

        query += ' order by date '
        const result = await db.query(query);
        if (destinationName && result.rowCount === 0) throw new AppError('destino escolhido não encontrado', 'SQLException getFlights', httpStatus.NOT_FOUND)
        return result.rows;

    }
}
