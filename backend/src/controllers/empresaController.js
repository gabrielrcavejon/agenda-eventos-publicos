import { empresaService } from "../services/empresaService.js";

export const empresaController = {
	async criar(req, res) {
		try {
			const dados = req.body;
			const empresa = await empresaService.criarEmpresa(
				dados.nome,
				dados.fantasia,
				dados.cnpj,
				dados.tipo
			);

			return res.status(201).json({
				message: "Empresa criada com sucesso",
				empresa,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				error: err.message || "Erro ao criar empresa",
			});
		}
	},

	async listar(req, res) {
		try {
			const empresas = await empresaService.listarEmpresas();
			return res.status(200).json({
				message: "Lista de empresas carregada com sucesso",
				empresas,
			});
		} catch (err) {
			console.log(err);
			return res.status(500).json({
				error: "Erro ao listar empresas",
			});
		}
	},
};
