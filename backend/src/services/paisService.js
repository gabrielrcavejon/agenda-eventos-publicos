import { db } from "../database/config/db.js";
import { Pais } from "../models/Pais.js";

export const paisService = {
	async listar() {
		const paisesRaw = await db("pais").select("idpais", "nome").orderBy("nome");

		const paises = paisesRaw.map((p) => new Pais(p.idpais, p.nome));

		return paises;
	},
};
