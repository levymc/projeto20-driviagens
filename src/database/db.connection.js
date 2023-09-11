import pg from "pg"
import dotenv from "dotenv"

const env = dotenv.config()

const { Pool } = pg

const configDatabase = {
  connectionString: env["DATABASE_URL"]
}

if (env["MODE"] === "prod") configDatabase.ssl = true

export const db = new Pool(configDatabase)