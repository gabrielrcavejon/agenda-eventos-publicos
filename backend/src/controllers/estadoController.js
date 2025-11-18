import { estadoService } from "../services/estadoService.js";

export const estadoController = {
	async listar(req, res) {
		try {
			const estados = await estadoService.listar();

			return res.status(200).json({
				message: "Lista de estados carregada com sucesso",
				dados: estados,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				error: "Erro ao listar estados",
			});
		}
	},
};
