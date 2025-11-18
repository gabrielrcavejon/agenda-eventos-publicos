import { Router } from "express";
import { authController } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/", authController.login);

export default authRouter;
