import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.routes.js";
import { MyException } from "./middlewares/errors/error.middleware.js";


dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)
app.use(MyException)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Running Linkr API on port ${PORT}`)
})