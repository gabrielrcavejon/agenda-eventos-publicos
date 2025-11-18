import { Router } from "express";
import { estadoController } from "../controllers/estadoController.js";
import { autenticar } from "../middleware/auth.js";

const estadoRouter = Router();

estadoRouter.get("/", autenticar, estadoController.listar);

export default estadoRouter;
