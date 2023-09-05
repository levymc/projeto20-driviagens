import { Router } from "express";

import authRouter from "./auth.routes.js";
import likesRouter from "./likes.routes.js";
import usersRouter from "./users.routes.js";
import passengersRouter from "./passengers.routes.js";
import postRouter from "./post.routes.js";

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(passengersRouter);
router.use(likesRouter);
router.use(postRouter);

export default router;
