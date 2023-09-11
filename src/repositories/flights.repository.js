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
            SELECT fli.id, "originCity".name as origin, "destCity".name as destination, TO_CHAR(fli.date, 'DD-MM-YYYY') AS date
            FROM public.flights as fli
            LEFT JOIN public.cities as "originCity" ON "originCity".id = fli.origin
            LEFT JOIN public.cities as "destCity" ON "destCity".id = fli.destination
            WHERE true
        `;
        const queryParams = []
    
        if (originName) {
            query += `
                AND fli.origin = (SELECT id FROM public.cities WHERE name = $${count})
            `;
            queryParams.push(`${originName}`);
            count++
        }
    
        if (destinationName) {
            query += `
                AND fli.destination = (SELECT id FROM public.cities WHERE name = $${count})
            `;
            queryParams.push(`${destinationName}`);
            count++
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
        if (destinationName && result.rowCount === 0) {
            throw new AppError('Destino escolhido não encontrado', 'SQLException getFlights', httpStatus.NOT_FOUND);
        }
        return result.rows;
    }     
}
