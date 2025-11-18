import { eventoService } from "../services/eventoService.js";

export const eventoController = {
	async criar(req, res) {
		try {
			const {
				idEmpresa,
				idEndereco,
				idUsuarioCriacao,
				nome,
				status,
				descricao,
				imagem,
				dataHoraInicio,
				dataHoraFim,
			} = req.body;

			const evento = await eventoService.criarEvento(
				idEmpresa,
				idEndereco,
				idUsuarioCriacao,
				nome,
				status,
				descricao,
				imagem,
				dataHoraInicio,
				dataHoraFim
			);

			return res
				.status(201)
				.json({ message: "Evento criado com sucesso", evento });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Erro ao criar evento" });
		}
	},

	async listar(req, res) {
		try {
			const eventos = await eventoService.listarEventos();
			return res.status(200).json({ eventos });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Erro ao listar eventos" });
		}
	},

	async pegar(req, res) {
		try {
			const evento = await eventoService.pegarEvento(req.params.id);
			if (!evento)
				return res.status(404).json({ error: "Evento não encontrado" });
			return res.status(200).json({ evento });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Erro ao buscar evento" });
		}
	},

	async mudarStatus(req, res) {
		try {
			const { status } = req.body;
			const evento = await eventoService.mudarStatus(req.params.id, status);
			return res
				.status(200)
				.json({ message: "Status atualizado com sucesso", evento });
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Erro ao atualizar status" });
		}
	},
};
