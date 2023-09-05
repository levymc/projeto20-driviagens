import { Router } from "express";

import passengersRouter from "./passengers.routes.js";

const router = Router();

router.use(passengersRouter);


export default router;
