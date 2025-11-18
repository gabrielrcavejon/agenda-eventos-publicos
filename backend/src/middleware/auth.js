import { verificarToken } from "../utils/jwt.js";

export const autenticar = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader)
		return res.status(401).json({ error: "Token não fornecido" });

	const [, token] = authHeader.split(" "); //Bearer

	const payload = verificarToken(token);

	if (!payload) return res.status(401).json({ error: "Token inválido" });

	req.user = payload; // adiciona info do usuário à requisição
	next();
};
