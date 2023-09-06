import { Router } from "express";
import CitiesController from "../controllers/cities.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { passengerSchema } from "../schemas/passengers.schemas.js";

const citiesRouter = Router();
const controller = new CitiesController()

citiesRouter.post('/cities', controller.handlePostPassenger); //, validateSchema(passengerSchema)

export default citiesRouter;
