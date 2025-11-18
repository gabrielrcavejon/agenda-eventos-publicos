import { enderecoService } from "../services/enderecoService.js";

export const enderecoController = {
	async criar(req, res) {
		try {
			const dados = req.body;

			const endereco = await enderecoService.criarEndereco(
				dados.idCidade,
				dados.logradouro,
				dados.bairro,
				dados.cep,
				dados.numero
			);

			return res.status(201).json({
				message: "Endereço criado com sucesso",
				endereco,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Erro ao criar endereço" });
		}
	},

	async listar(req, res) {
		try {
			const enderecos = await enderecoService.listarEnderecos();

			return res.status(200).json({
				message: "Lista de endereços carregada com sucesso",
				enderecos,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({ error: "Erro ao listar endereços" });
		}
	},
};
