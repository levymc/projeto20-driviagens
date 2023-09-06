import { Router } from "express";
import CitiesController from "../controllers/cities.controller.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { citySchema } from "../schemas/cities.schemas.js";

const citiesRouter = Router();
const controller = new CitiesController()

citiesRouter.post('/cities', validateSchema(citySchema), controller.handlePostPassenger); //, 

export default citiesRouter;
