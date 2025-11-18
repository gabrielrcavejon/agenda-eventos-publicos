import { db } from "../database/config/db.js";
import { Estado } from "../models/Estado.js";

export const estadoService = {
	async listar() {
		const estadosRaw = await db("estado")
			.select("idestado", "idpais", "nome")
			.orderBy("idestado");

		const estado = estadosRaw.map(
			(e) => new Estado(e.idestado, e.idpais, e.nome)
		);

		return estado;
	},
};
