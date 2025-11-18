export const Tipo = {
	ORGANIZADOR: "O",
	ADMINISTRADOR: "A",
};

export class Empresa {
	constructor(idEmpresa, nome, fantasia, cnpj, tipo, idEndereco) {
		this.idEmpresa = idEmpresa;
		this.nome = nome;
		this.fantasia = fantasia;
		this.cnpj = cnpj;
		this.idEndereco = idEndereco;

		// validação simples do tipo
		if (![Tipo.ORGANIZADOR, Tipo.ADMINISTRADOR].includes(tipo)) {
			throw new Error("Tipo inválido. Use 'O' ou 'A'.");
		}

		this.tipo = tipo;
	}
}
