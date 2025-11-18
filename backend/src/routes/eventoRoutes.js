import { Router } from "express";
import { eventoController } from "../controllers/eventoController.js";
import { autenticar } from "../middleware/auth.js";

const eventoRouter = Router();

eventoRouter.post("/", autenticar, eventoController.criar);
eventoRouter.get("/", autenticar, eventoController.listar);
eventoRouter.get("/:id", autenticar, eventoController.pegar);
eventoRouter.put("/:id/status", autenticar, eventoController.mudarStatus);

export default eventoRouter;
