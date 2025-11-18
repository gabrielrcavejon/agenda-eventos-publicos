import { Router } from "express";
import { empresaController } from "../controllers/empresaController.js";

const empresaRouter = Router();

empresaRouter.post("/", empresaController.criar);
empresaRouter.get("/", empresaController.listar);

export default empresaRouter;
