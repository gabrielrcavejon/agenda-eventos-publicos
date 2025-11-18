import bcrypt from "bcryptjs";
import { db } from "../database/config/db.js";
import { gerarToken } from "../utils/jwt.js";

export const authController = {
	async login(req, res) {
		try {
			const { email, senha } = req.body;

			const usuario = await db("usuario").where({ email }).first();

			if (!usuario)
				return res.status(401).json({ error: "Usuário ou senha inválidos" });

			const senhaValida = await bcrypt.compare(senha, usuario.senha);

			if (!senhaValida)
				return res.status(401).json({ error: "Usuário ou senha inválidos" });

			const token = gerarToken({
				idUsuario: usuario.idusuario,
				idEmpresa: usuario.idempresa,
				tipo: usuario.tipo,
			});

			// REMOVE a senha antes de retornar
			const { senha: _, ...usuarioSemSenha } = usuario;

			return res.json({
				token,
				usuario: usuarioSemSenha,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Erro no login" });
		}
	},
};
