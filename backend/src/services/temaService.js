import { db } from "../database/config/db.js";
import { Tema } from "../models/Tema.js";

export const temaService = {
	async listar() {
		const rows = await db("tema").select("idtema", "nome").orderBy("nome");

		const temas = rows.map((t) => new Tema(t.idtema, t.nome));

		return temas;
	},
};
