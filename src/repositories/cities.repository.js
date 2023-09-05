import { db } from "../database/db.connection.js";
import httpStatus from "http-status";

export default class CitiesRepository {
    async postCityDB(name) {
        const query = `
            insert into public.cities (name) values ($1) returning id
        `;
            const values = [name];
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            error.status = httpStatus.INTERNAL_SERVER_ERROR
            error.name = "SQLException CitiesRepository.postCityDB"
            throw error
        }
    }    
}
