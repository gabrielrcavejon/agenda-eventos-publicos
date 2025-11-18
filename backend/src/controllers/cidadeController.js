import { cidadeService } from "../services/cidadeService.js";

export const cidadeController = {
	async listar(req, res) {
		try {
			const cidades = await cidadeService.listar();

			return res.status(200).json({
				message: "Lista de cidades carregada com sucesso",
				dados: cidades,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				error: "Erro ao listar cidades",
			});
		}
	},
};
