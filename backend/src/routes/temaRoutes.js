import { Router } from "express";
import { temaController } from "../controllers/temaController.js";

const temaRouter = Router();

temaRouter.get("/", temaController.listar);

export default temaRouter;
