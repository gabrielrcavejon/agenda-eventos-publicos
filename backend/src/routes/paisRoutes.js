import { Router } from "express";
import { paisController } from "../controllers/paisController.js";
import { autenticar } from "../middleware/auth.js";

const paisRouter = Router();

paisRouter.get("/", autenticar, paisController.listar);

export default paisRouter;
