import { Router } from "express";
import TravelsController from "../controllers/travels.controller.js";


const travelsRouter = Router();
const controller = new TravelsController()

travelsRouter.post('/travels', controller.handlePostTravel); // validateSchema(flightsSchema),

export default travelsRouter;
