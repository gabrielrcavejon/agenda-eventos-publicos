import { Router } from "express";
import { usuarioController } from "../controllers/usuarioController.js";

const usuarioRouter = Router();

usuarioRouter.post("/", usuarioController.criar);

export default usuarioRouter;
