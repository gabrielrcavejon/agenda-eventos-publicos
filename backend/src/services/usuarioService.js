import bcrypt from "bcryptjs";
import { db } from "../database/config/db.js";
import { Usuario, Tipo } from "../models/Usuario.js";

export const usuarioService = {
	async criarUsuario(idEmpresa, tipo, nome, email, senha, telefone, foto) {
		if (
			![Tipo.ADMINISTRADOR, Tipo.ORGANIZADOR, Tipo.PARTICIPANTE].includes(tipo)
		) {
			throw new Error("Tipo inválido. Deve ser 'A', 'O' ou 'P'");
		}

		const usuario = new Usuario(
			0,
			idEmpresa,
			tipo,
			nome,
			email,
			senha,
			telefone,
			foto
		);

		// hash da senha
		const hash = await bcrypt.hash(usuario.senha, 10);
		usuario.senha = hash;

		// salvar no banco
		const [retornoId] = await db("usuario")
			.insert({
				idempresa: usuario.idEmpresa,
				tipo: usuario.tipo,
				nome: usuario.nome,
				email: usuario.email,
				senha: usuario.senha,
				telefone: usuario.telefone,
				foto: usuario.foto,
			})
			.returning("idusuario");

		usuario.idUsuario = retornoId.idusuario ?? retornoId;

		return usuario;
	},
};
