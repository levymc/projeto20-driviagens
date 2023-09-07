import { Router } from "express";
import FlightsController from "../controllers/flights.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { flightsSchema, flightDate } from "../schemas/flights.schemas.js";

const flightsRouter = Router();
const controller = new FlightsController()

flightsRouter.post('/flights', validateSchema(flightsSchema), controller.handlePostFlight)
flightsRouter.get('/flights', validateSchema(flightDate), controller.handleGetFlights)

export default flightsRouter
