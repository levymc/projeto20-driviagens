import { db } from "../database/db.connection.js";
import httpStatus from "http-status";
import AppError from "../middlewares/errors/AppError.js";

export default class TravelsRepository {
    async postTravelDB(passengerId, flightId) {
        const query = `
            insert into public.travels ("passengerId", "flightId") values ($1, $2) returning id
        `;
            const values = [passengerId, flightId];
        try {
            const result = await db.query(query, values);
            return result.rows[0];
        } catch (error) {
            switch(error.code){
                case '08P01':
                    throw new AppError(error.detail, 'SQLException TravelsRepository.postTravelDB', httpStatus.INTERNAL_SERVER_ERROR)
                case '23503':
                    throw new AppError(error.detail, `'passengerId' e 'flightId' devem existir`, httpStatus.NOT_FOUND)
                default:
                    throw new AppError(error, "defaultError", httpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }    
}
