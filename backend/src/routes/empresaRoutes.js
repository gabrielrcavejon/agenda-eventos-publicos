import { Router } from "express";
import { empresaController } from "../controllers/empresaController.js";
import { autenticar } from "../middleware/auth.js";

const empresaRouter = Router();

empresaRouter.post("/", autenticar, empresaController.criar);
empresaRouter.get("/", autenticar, empresaController.listar);

export default empresaRouter;
