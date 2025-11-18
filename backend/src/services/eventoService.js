import { db } from "../database/config/db.js";
import { Evento } from "../models/Evento.js";

export const eventoService = {
	async criarEvento(
		idEmpresa,
		idEndereco,
		idUsuarioCriacao,
		nome,
		status,
		descricao,
		imagem,
		dataHoraInicio,
		dataHoraFim
	) {
		const evento = new Evento(
			null,
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

		const [retornoId] = await db("evento")
			.insert({
				idempresa: evento.idEmpresa,
				idendereco: evento.idEndereco,
				idusuariocriacao: evento.idUsuarioCriacao,
				nome: evento.nome,
				status: evento.status,
				descricao: evento.descricao,
				imagem: evento.imagem,
				datahorainicio: evento.dataHoraInicio,
				datahorafim: evento.dataHoraFim,
			})
			.returning("idevento");

		evento.idEvento = retornoId.idevento ?? retornoId;
		return evento;
	},

	async listarEventos() {
		const eventosRaw = await db("evento")
			.select(
				"idevento as idEvento",
				"idempresa as idEmpresa",
				"idendereco as idEndereco",
				"idusuariocriacao as idUsuarioCriacao",
				"nome",
				"status",
				"descricao",
				"imagem",
				"datahorainicio as dataHoraInicio",
				"datahorafim as dataHoraFim"
			)
			.orderBy("datahorainicio", "desc");

		return eventosRaw.map(
			(e) =>
				new Evento(
					e.idEvento,
					e.idEmpresa,
					e.idEndereco,
					e.idUsuarioCriacao,
					e.nome,
					e.status,
					e.descricao,
					e.imagem,
					e.dataHoraInicio,
					e.dataHoraFim
				)
		);
	},

	async pegarEvento(id) {
		const e = await db("evento")
			.select(
				"idevento as idEvento",
				"idempresa as idEmpresa",
				"idendereco as idEndereco",
				"idusuariocriacao as idUsuarioCriacao",
				"nome",
				"status",
				"descricao",
				"imagem",
				"datahorainicio as dataHoraInicio",
				"datahorafim as dataHoraFim"
			)
			.where("idevento", id)
			.first();

		if (!e) return null;
		return new Evento(
			e.idEvento,
			e.idEmpresa,
			e.idEndereco,
			e.idUsuarioCriacao,
			e.nome,
			e.status,
			e.descricao,
			e.imagem,
			e.dataHoraInicio,
			e.dataHoraFim
		);
	},

	async mudarStatus(id, novoStatus) {
		await db("evento").where("idevento", id).update({ status: novoStatus });

		return await this.pegarEvento(id);
	},
};
