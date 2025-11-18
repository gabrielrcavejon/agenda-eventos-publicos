import { Router } from "express";
import { cidadeController } from "../controllers/cidadeController.js";

const cidadeRouter = Router();

cidadeRouter.get("/", cidadeController.listar);

export default cidadeRouter;
