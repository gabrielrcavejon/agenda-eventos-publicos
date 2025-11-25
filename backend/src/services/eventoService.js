import { db } from "../database/config/db.js";
import { Evento } from "../models/Evento.js";
import { Endereco } from "../models/Endereco.js";

export const eventoService = {
	// Cria um evento
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

	// Lista todos os eventos com endereço
	async listarEventos() {
		const eventosRaw = await db("evento as e")
			.select(
				"e.idevento as idEvento",
				"e.idempresa as idEmpresa",
				"e.idendereco as idEndereco",
				"e.idusuariocriacao as idUsuarioCriacao",
				"e.nome",
				"e.status",
				"e.descricao",
				"e.imagem",
				"e.datahorainicio as dataHoraInicio",
				"e.datahorafim as dataHoraFim",
				"end.idendereco as enderecoId",
				"end.idcidade as enderecoIdCidade",
				"end.logradouro as enderecoLogradouro",
				"end.bairro as enderecoBairro",
				"end.cep as enderecoCep",
				"end.numero as enderecoNumero"
			)
			.leftJoin("endereco as end", "e.idendereco", "end.idendereco")
			.orderBy("e.datahorainicio", "desc");

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
					e.dataHoraFim,
					new Endereco(
						e.enderecoId,
						e.enderecoIdCidade,
						e.enderecoLogradouro,
						e.enderecoBairro,
						e.enderecoCep,
						e.enderecoNumero
					)
				)
		);
	},

	// Pega um evento pelo ID com endereço
	async pegarEvento(id) {
		const e = await db("evento as ev")
			.select(
				"ev.idevento as idEvento",
				"ev.idempresa as idEmpresa",
				"ev.idendereco as idEndereco",
				"ev.idusuariocriacao as idUsuarioCriacao",
				"ev.nome",
				"ev.status",
				"ev.descricao",
				"ev.imagem",
				"ev.datahorainicio as dataHoraInicio",
				"ev.datahorafim as dataHoraFim",
				"end.idendereco as enderecoId",
				"end.idcidade as enderecoIdCidade",
				"end.logradouro as enderecoLogradouro",
				"end.bairro as enderecoBairro",
				"end.cep as enderecoCep",
				"end.numero as enderecoNumero"
			)
			.leftJoin("endereco as end", "ev.idendereco", "end.idendereco")
			.where("ev.idevento", id)
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
			e.dataHoraFim,
			new Endereco(
				e.enderecoId,
				e.enderecoIdCidade,
				e.enderecoLogradouro,
				e.enderecoBairro,
				e.enderecoCep,
				e.enderecoNumero
			)
		);
	},

	// Muda o status de um evento
	async mudarStatus(id, novoStatus) {
		await db("evento").where("idevento", id).update({ status: novoStatus });
		return await this.pegarEvento(id);
	},

	// Retorna todos os eventos em JSON pronto, incluindo endereço
	async listarEventosJSON() {
		const eventos = await this.listarEventos();

		return {
			eventos: eventos.map((e) => ({
				idEvento: e.idEvento,
				idEmpresa: e.idEmpresa,
				idEndereco: e.idEndereco,
				idUsuarioCriacao: e.idUsuarioCriacao,
				nome: e.nome,
				status: e.status,
				descricao: e.descricao,
				imagem: e.imagem,
				dataHoraInicio: e.dataHoraInicio,
				dataHoraFim: e.dataHoraFim,
				endereco: e.endereco
					? {
							idEndereco: e.endereco.idEndereco,
							idCidade: e.endereco.idCidade,
							logradouro: e.endereco.logradouro,
							bairro: e.endereco.bairro,
							cep: e.endereco.cep,
							numero: e.endereco.numero,
					  }
					: null,
			})),
		};
	},
};
