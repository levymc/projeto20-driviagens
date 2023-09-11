import { db } from "../database/db.connection.js";
import httpStatus from "http-status";

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
            error.status = httpStatus.INTERNAL_SERVER_ERROR
            error.name = "SQLException PassengersRepository.postPassengerDB"
            throw error
        }
    }    

    async getPassengersTravels(){
        const query = `
            SELECT CONCAT(pass."firstName", ' ', pass."lastName") AS passenger,
            COUNT(tra."passengerId") AS travels
            FROM public.passengers AS pass
            LEFT JOIN public.travels AS tra ON pass.id = tra."passengerId"
            GROUP BY passenger
            ORDER BY travels DESC
        `
        try {
            const result = await db.query(query);
            return result.rows
        } catch (error) {
            error.status = httpStatus.INTERNAL_SERVER_ERROR
            error.name = "SQLException PassengersRepository.getPassengersTravels"
            throw error
        }
    }
}
