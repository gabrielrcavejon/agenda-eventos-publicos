import { Router } from "express";
import { estadoController } from "../controllers/estadoController.js";

const estadoRouter = Router();

estadoRouter.get("/", estadoController.listar);

export default estadoRouter;
