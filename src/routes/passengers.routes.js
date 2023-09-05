import { Router } from "express";
import PassengersController from "../controllers/passengers.controller.js";

const passengersRouter = Router();
const controller = new PassengersController()

passengersRouter.post('/passengers', controller.handlePostPassenger);
passengersRouter.get('/passengers/travels');

export default passengersRouter;
