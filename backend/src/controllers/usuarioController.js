import { usuarioService } from "../services/usuarioService.js";

export const usuarioController = {
	async criar(req, res) {
		try {
			const { idEmpresa, tipo, nome, email, senha, telefone, foto } = req.body;

			const usuario = await usuarioService.criarUsuario(
				idEmpresa,
				tipo,
				nome,
				email,
				senha,
				telefone,
				foto
			);

			usuario.senha = null;

			return res.status(201).json({
				message: "Usuário criado com sucesso",
				usuario,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Erro ao criar usuário" });
		}
	},
};
