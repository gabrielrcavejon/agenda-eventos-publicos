import { eventoTemaService } from "../services/eventoTemaService.js";

export const eventoTemaController = {
	async vincular(req, res) {
		try {
			const { idEvento, idTema } = req.body;

			const novo = await eventoTemaService.vincular(idEvento, idTema);

			return res.status(201).json({
				message: "Tema vinculado com sucesso",
				vinculo: novo,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Erro ao vincular tema" });
		}
	},

	async listar(req, res) {
		try {
			const { id } = req.params;

			const temas = await eventoTemaService.listarPorEvento(id);

			return res.json(temas);
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Erro ao listar temas do evento" });
		}
	},
};
