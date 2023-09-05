import { Router } from "express";
import PassengersController from "../controllers/passengers.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { passengerSchema } from "../schemas/passengers.schemas.js";

const passengersRouter = Router();
const controller = new PassengersController()

passengersRouter.post('/passengers', validateSchema(passengerSchema) , controller.handlePostPassenger);
passengersRouter.get('/passengers/travels');

export default passengersRouter;
