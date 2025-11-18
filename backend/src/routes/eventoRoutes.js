import { Router } from "express";
import { eventoController } from "../controllers/eventoController.js";

const eventoRouter = Router();

eventoRouter.post("/", eventoController.criar);
eventoRouter.get("/", eventoController.listar);
eventoRouter.get("/:id", eventoController.pegar);
eventoRouter.put("/:id/status", eventoController.mudarStatus);

export default eventoRouter;
