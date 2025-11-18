import { db } from "../database/config/db.js";
import { EventoTema } from "../models/EventoTema.js";

export const eventoTemaService = {
	async vincular(idevento, idtema) {
		const link = new EventoTema(idevento, idtema);

		await db("evento_tema").insert({
			idevento: link.idevento,
			idtema: link.idtema,
		});

		return link;
	},

	async listarPorEvento(idevento) {
		const rows = await db("evento_tema as et")
			.join("tema as t", "t.idtema", "et.idtema")
			.select("t.idtema", "t.nome")
			.where("et.idevento", idevento);

		const temas = rows.map((t) => new EventoTema(idevento, t.idtema));

		temas.forEach((t, i) => (t.nome = rows[i].nome));

		return temas;
	},
};
