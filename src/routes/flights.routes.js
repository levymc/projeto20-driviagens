import { Router } from "express";
import FlightsController from "../controllers/flights.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { flightsSchema } from "../schemas/flights.schemas.js";

const flightsRouter = Router();
const controller = new FlightsController()

flightsRouter.post('/flights', validateSchema(flightsSchema), controller.handlePostFlight)
flightsRouter.get('/flights')

export default flightsRouter
