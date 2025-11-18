import { db } from "../database/config/db.js";
import { Endereco } from "../models/Endereco.js";

export const enderecoService = {
	async criarEndereco(idCidade, logradouro, bairro, cep, numero) {
		const endereco = new Endereco({
			idCidade,
			logradouro,
			bairro,
			cep,
			numero,
		});

		const [retornoId] = await db("endereco")
			.insert({
				idcidade: endereco.idCidade,
				logradouro: endereco.logradouro,
				bairro: endereco.bairro,
				cep: endereco.cep,
				numero: endereco.numero,
			})
			.returning("idendereco");

		endereco.idEndereco = retornoId.idendereco ?? retornoId;

		return endereco;
	},

	async listarEnderecos() {
		const enderecosRaw = await db("endereco").select(
			"idendereco",
			"idcidade",
			"logradouro",
			"bairro",
			"cep",
			"numero"
		);

		console.log(enderecosRaw);

		return enderecosRaw.map(
			(e) =>
				new Endereco(
					e.idendereco,
					e.idcidade,
					e.logradouro,
					e.bairro,
					e.cep,
					e.numero
				)
		);
	},
};
