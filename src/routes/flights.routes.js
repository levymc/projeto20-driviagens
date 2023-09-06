import { Router } from "express";
import FlightsController from "../controllers/flights.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { passengerSchema } from "../schemas/passengers.schemas.js";
import { flightsSchema } from "../schemas/flights.schemas.js";
import dayjs from "dayjs";

const flightsRouter = Router();
const controller = new FlightsController()

flightsRouter.post('/flights', validateSchema(flightsSchema), controller.handlePostFlight);
flightsRouter.get('/flights');

export default flightsRouter;
