import { paisService } from "../services/paisService.js";

export const paisController = {
	async listar(req, res) {
		try {
			const paises = await paisService.listar();

			return res.status(200).json({
				message: "Lista de países carregada com sucesso",
				dados: paises,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				error: "Erro ao listar países",
			});
		}
	},
};
