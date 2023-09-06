import { Router } from "express";
import FlightsController from "../controllers/flights.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { passengerSchema } from "../schemas/passengers.schemas.js";

const flightsRouter = Router();
const controller = new FlightsController()

flightsRouter.post('/flights', controller.handlePostFlight); //validateSchema(passengerSchema),
flightsRouter.get('/flights');

export default flightsRouter;
