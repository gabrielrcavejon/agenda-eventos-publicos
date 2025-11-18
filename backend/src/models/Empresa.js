export const Tipo = {
	ORGANIZADOR: "O",
	ADMINISTRADOR: "A",
};

export class Empresa {
	constructor(idEmpresa, nome, fantasia, cnpj, tipo) {
		this.idEmpresa = idEmpresa;
		this.nome = nome;
		this.fantasia = fantasia;
		this.cnpj = cnpj;
		this.tipo = tipo; // deve ser 'O' ou 'A'
	}
}
