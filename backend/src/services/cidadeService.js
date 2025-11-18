import { db } from "../database/config/db.js";
import { Cidade } from "../models/Cidade.js";

export const cidadeService = {
	async listar() {
		const cidadeRaw = await db("cidade")
			.select("idcidade", "idestado", "nome")
			.orderBy("idcidade");

		const cidades = cidadeRaw.map(
			(c) => new Cidade(c.idestado, c.idestado, c.nome)
		);

		return cidades;
	},
};
