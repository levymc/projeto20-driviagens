import { db } from "./src/database/db.connection.js";

const query = `
            select * from public.flights order by date
        `;
        try {
            const result = await db.query(query);
            console.log(result.rows)
        } catch (error) {
            console.error(error)
        }