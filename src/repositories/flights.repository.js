import { db } from "../database/db.connection.js";
import httpStatus from "http-status";

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
            error.status = httpStatus.INTERNAL_SERVER_ERROR
            error.name = "SQLException PassengersRepository.postPassengerDB"
            throw error
        }
    }    
}
