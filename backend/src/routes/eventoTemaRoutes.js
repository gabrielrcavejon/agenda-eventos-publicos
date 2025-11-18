import { Router } from "express";
import { eventoTemaController } from "../controllers/eventoTemaController.js";
import { autenticar } from "../middleware/auth.js";

const eventoTemaRouter = Router();

// vincular tema ao evento
eventoTemaRouter.post("/", autenticar, eventoTemaController.vincular);

// listar temas de um evento
eventoTemaRouter.get("/:id", eventoTemaController.listar);

export default eventoTemaRouter;
