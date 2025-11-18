import express from "express";
import dotenv from "dotenv";
import paisRouter from "./src/routes/paisRoutes.js";
import usuarioRouter from "./src/routes/usuarioRoutes.js";
import estadoRouter from "./src/routes/estadoRoutes.js";
import cidadeRouter from "./src/routes/cidadeRoutes.js";
import enderecoRouter from "./src/routes/enderecoRoutes.js";
import empresaRouter from "./src/routes/empresaRoutes.js";
import eventoRouter from "./src/routes/eventoRoutes.js";
import authRouter from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// rotas
app.use("/usuario", usuarioRouter);
app.use("/pais", paisRouter);
app.use("/estado", estadoRouter);
app.use("/cidade", cidadeRouter);
app.use("/endereco", enderecoRouter);
app.use("/empresa", empresaRouter);
app.use("/evento", eventoRouter);
app.use("/login", authRouter);

app.listen(process.env.PORT, () => {
	console.log("API rodando na porta " + process.env.PORT);
});
