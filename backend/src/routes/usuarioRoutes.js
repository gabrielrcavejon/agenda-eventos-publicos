import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";
import { autenticar } from "../middleware/auth.js";

const usuarioRouter = Router();

usuarioRouter.post("/", autenticar, usuarioController.criar);

export default usuarioRouter;
