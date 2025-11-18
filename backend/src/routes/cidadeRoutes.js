import { Router } from "express";
import { cidadeController } from "../controllers/cidadeController.js";
import { autenticar } from "../middleware/auth.js";

const cidadeRouter = Router();

cidadeRouter.get("/", autenticar, cidadeController.listar);

export default cidadeRouter;
