import { Router } from "express";
import passengersRouter from "./passengers.routes.js";
import citiesRouter from "./cities.routes.js";

const router = Router();

router.use(passengersRouter);
router.use(citiesRouter);


export default router;
