import bcrypt from "bcryptjs";
import { db } from "../database/config/db.js";
import { Usuario } from "../models/Usuario.js";

export const usuarioService = {
	async criarUsuario(email, senha) {
		const usuario = new Usuario(email, senha);

		// hash da senha
		const hash = await bcrypt.hash(usuario.senha, 10);
		usuario.senha = hash;

		// salvando
		const [retornoId] = await db("usuario")
			.insert({
				email: usuario.email,
				senha: usuario.senha,
			})
			.returning("idusuario");

		return { idusuario: retornoId.idusuario, email: usuario.email };
	},
};
