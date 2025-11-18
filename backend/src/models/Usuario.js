export const Tipo = {
	ADMINISTRADOR: "A",
	ORGANIZADOR: "O",
	PARTICIPANTE: "P",
};

export class Usuario {
	constructor(idUsuario, idEmpresa, tipo, nome, email, senha, telefone, foto) {
		this.idUsuario = idUsuario;
		this.idEmpresa = idEmpresa;
		this.tipo = tipo; // 'A', 'O' ou 'P'
		this.nome = nome;
		this.email = email;
		this.senha = senha;
		this.telefone = telefone;
		this.foto = foto;
	}
}
