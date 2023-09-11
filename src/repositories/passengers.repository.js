import { db } from "../database/db.connection.js";
import httpStatus from "http-status";
import AppError from "../middlewares/errors/AppError.js";

export default class PassengersRepository {
    async postPassengerDB(firstName, lastName) {
        const query = `
            insert into public.passengers ("firstName", "lastName") values ($1, $2) returning id
        `;
            const values = [firstName, lastName];
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw AppError('SQLException PassengersRepository.postPassengerDB', error, httpStatus.BAD_REQUEST)
        }
    }    

    async getPassengersTravels(page, name){
        let count = 1
        let query = `
            SELECT CONCAT(pass."firstName", ' ', pass."lastName") AS passenger,
            COUNT(tra."passengerId") AS travels
            FROM public.passengers AS pass
            LEFT JOIN public.travels AS tra ON pass.id = tra."passengerId"
        `;
        const queryParams = []
    
        if (name) {
            query += `WHERE pass."firstName" || ' ' || pass."lastName" ILIKE '%' || $${count} || '%' `;
            queryParams.push(`${name}`)
            count ++
        }
        
        query += `
            GROUP BY passenger
            ORDER BY travels DESC
            OFFSET $${count}; 
        `;
        queryParams.push(page * 10)
        try {
            const result = await db.query(query, queryParams);
            return { responseDB: result.rows, rowCount: result.rowCount }
        } catch (error) {
            throw AppError('SQLException PassengersRepository.getPassengersTravels', error, httpStatus.BAD_REQUEST)
        }
    }
}
