import { Router } from "express";
import { paisController } from "../controllers/paisController.js";

const paisRouter = Router();

paisRouter.get("/", paisController.listar);

export default paisRouter;
