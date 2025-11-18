import { db } from "../database/config/db.js";
import { Empresa, Tipo } from "../models/Empresa.js";

export const empresaService = {
	async criarEmpresa(nome, fantasia, cnpj, tipo, idEndereco) {
		if (![Tipo.ADMINISTRADOR, Tipo.ORGANIZADOR].includes(tipo)) {
			throw new Error("Tipo inválido. Deve ser 'O' ou 'A'");
		}

		// Empresa nova começa com idEmpresa = 0
		const empresa = new Empresa(0, nome, fantasia, cnpj, tipo, idEndereco);

		const [retornoId] = await db("empresa")
			.insert({
				nome: empresa.nome,
				fantasia: empresa.fantasia,
				cnpj: empresa.cnpj,
				tipo: empresa.tipo,
				idendereco: empresa.idEndereco,
			})
			.returning("idempresa");

		empresa.idEmpresa = retornoId.idempresa ?? retornoId;

		return empresa;
	},

	async listarEmpresas() {
		const empresasRaw = await db("empresa")
			.select("idempresa", "nome", "fantasia", "cnpj", "tipo", "idendereco")
			.orderBy("nome");

		// passa para o construtor certinho
		return empresasRaw.map(
			(e) =>
				new Empresa(
					e.idempresa,
					e.nome,
					e.fantasia,
					e.cnpj,
					e.tipo,
					e.idendereco
				)
		);
	},
};
