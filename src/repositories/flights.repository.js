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
        let count = 1;

        let query = `
            select * FROM public.flights where true
        `
        const queryParams = []
      
        if (originName) {
            query += `
                AND origin = (SELECT id FROM public.cities WHERE name = $${count})
            `;
            queryParams.push(`${originName}`);
            count ++
        } 
        
        if (destinationName) {
            query += `
                AND destination = (SELECT id FROM public.cities WHERE name = $${count})
            `;
            queryParams.push(`${destinationName}`);
            count ++
        }
      
        if (biggerDate && smallerDate) {
            query += `
                AND date <= $${count}
                AND date >= $${count + 1}
            `;
            queryParams.push(biggerDate, smallerDate);
        }
      
        query += ' ORDER BY date ';
        const result = await db.query(query, queryParams);
        
        if ( (biggerDate != null && smallerDate != null) && result.rowCount ===0 ){
            throw new AppError('Período de dias não encontrado', 'SQLException getFlights - smaller-date e bigger-date', httpStatus.NOT_FOUND);
        } else if (destinationName && result.rowCount === 0) {
            throw new AppError('Destino escolhido não encontrado', 'SQLException getFlights', httpStatus.NOT_FOUND);
        }

        
      
        return result.rows;
      }
      
}
