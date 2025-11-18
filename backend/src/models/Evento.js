export const StatusEvento = {
	APROVADO: "A",
	PENDENTE: "P",
	REPROVADO: "R",
};

export class Evento {
	constructor(
		idEvento,
		idEmpresa,
		idEndereco,
		idUsuarioCriacao,
		nome,
		status,
		descricao,
		imagem,
		dataHoraInicio,
		dataHoraFim
	) {
		this.idEvento = idEvento;
		this.idEmpresa = idEmpresa;
		this.idEndereco = idEndereco;
		this.idUsuarioCriacao = idUsuarioCriacao;
		this.nome = nome;
		this.status = status; // A = aprovado, P = pendente, R = reprovado
		this.descricao = descricao;
		this.imagem = imagem;
		this.dataHoraInicio = dataHoraInicio;
		this.dataHoraFim = dataHoraFim;
	}
}
