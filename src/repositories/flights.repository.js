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

    async getFlights(originName, destinationName, biggerDate, smallerDate) {
        let query = `
            select * FROM public.flights
        `
        const queryParams = []
      
        if (originName && destinationName) {
            query += `
                WHERE origin = (SELECT id FROM public.cities WHERE name ILIKE $1)
                AND destination = (SELECT id FROM public.cities WHERE name ILIKE $2)
            `;
            queryParams.push(`%${originName}%`, `%${destinationName}%`);
        } else if (originName) {
            query += `
                WHERE origin = (SELECT id FROM public.cities WHERE name ILIKE $1)
            `;
            queryParams.push(`%${originName}%`);
        } else if (destinationName) {
            query += `
                WHERE destination = (SELECT id FROM public.cities WHERE name ILIKE $1)
            `;
            queryParams.push(`%${destinationName}%`);
        }
      
        if (biggerDate && smallerDate) {
            query += `
                AND date >= $3
                AND date <= $4
            `;
            queryParams.push(biggerDate, smallerDate);
        }
      
        query += ' ORDER BY date ';
      
        const result = await db.query(query, queryParams);
      
        if (destinationName && result.rowCount === 0) {
          throw new AppError('Destino escolhido não encontrado', 'SQLException getFlights', httpStatus.NOT_FOUND);
        }else if (biggerDate)
      
        return result.rows;
      }
      
}
