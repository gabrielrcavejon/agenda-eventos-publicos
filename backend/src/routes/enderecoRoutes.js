import { Router } from "express";
import { enderecoController } from "../controllers/enderecoController.js";

const enderecoRouter = Router();

enderecoRouter.post("/", enderecoController.criar);
enderecoRouter.get("/", enderecoController.listar);

export default enderecoRouter;
