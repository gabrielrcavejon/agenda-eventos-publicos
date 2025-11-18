import { db } from "../database/config/db.js";
import { Empresa } from "../models/Empresa.js";
import { Tipo } from "../models/Empresa.js";

export const empresaService = {
	async criarEmpresa(nome, fantasia, cnpj, tipo) {
		if (![Tipo.ADMINISTRADOR, Tipo.ORGANIZADOR].includes(tipo)) {
			throw new Error("Tipo inválido. Deve ser 'O' ou 'A'");
		}

		const empresa = new Empresa(0, nome, fantasia, cnpj, tipo);

		const [retornoId] = await db("empresa")
			.insert({
				nome: empresa.nome,
				fantasia: empresa.fantasia,
				cnpj: empresa.cnpj,
				tipo: empresa.tipo,
			})
			.returning("idempresa");

		empresa.idEmpresa = retornoId.idempresa ?? retornoId;

		return empresa;
	},

	async listarEmpresas() {
		const empresasRaw = await db("empresa")
			.select("idempresa", "nome", "fantasia", "cnpj", "tipo")
			.orderBy("nome");

		return empresasRaw.map((e) => new Empresa(e));
	},
};
