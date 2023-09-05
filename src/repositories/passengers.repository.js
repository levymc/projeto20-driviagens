import { db } from "../database/db.connection.js";

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
            error.status = 500
            error.name = "SQLException PassengersRepository.postPassengerDB"
            throw error
        }
    }    
}
