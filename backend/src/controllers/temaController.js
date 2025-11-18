import { temaService } from "../services/temaService.js";

export const temaController = {
	async listar(req, res) {
		try {
			const itens = await temaService.listar();
			return res.json(itens);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Erro ao listar temas" });
		}
	},
};
