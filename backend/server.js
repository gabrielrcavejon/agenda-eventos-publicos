import express from "express";
import dotenv from "dotenv";
import usuarioRoutes from "./src/routes/usuario.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// rotas
app.use("/usuario", usuarioRoutes);

app.listen(process.env.PORT, () => {
	console.log("API rodando na porta " + process.env.PORT);
});
