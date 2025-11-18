import { Router } from "express";
import { enderecoController } from "../controllers/enderecoController.js";
import { autenticar } from "../middleware/auth.js";

const enderecoRouter = Router();

enderecoRouter.post("/", autenticar, enderecoController.criar);
enderecoRouter.get("/", autenticar, enderecoController.listar);

export default enderecoRouter;
