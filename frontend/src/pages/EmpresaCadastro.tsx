// EmpresaCadastro.tsx
import React, { useEffect, useState } from "react";
import api from "../service/api";

interface Estado {
  idestado: number;
  nome: string;
}

interface Cidade {
  idcidade: number;
  nome: string;
}

const EmpresaCadastro: React.FC = () => {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [form, setForm] = useState({
    nome: "",
    fantasia: "",
    cnpj: "",
    tipo: "A", // default tipo
    estado: "",
    cidade: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
  });

  // Puxa estados do backend
  useEffect(() => {
    
    api.get("/estado").then(res => setEstados(res.data.dados));
    api.get(`/cidade`).then(res => setCidades(res.data.dados));

  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1️⃣ Cadastra endereço
      const enderecoRes = await api.post("/endereco", {
        logradouro: form.logradouro,
        numero: form.numero,
        bairro: form.bairro,
        cep: form.cep,
        idcidade: form.cidade,
      });

      const idEndereco = enderecoRes.data.endereco.idEndereco; // pega o ID retornado

      // 2️⃣ Cadastra empresa com o ID do endereço
      const empresaRes = await api.post("/empresa", {
        nome: form.nome,
        fantasia: form.fantasia,
        cnpj: form.cnpj,
        tipo: form.tipo,
        idEndereco,
      });

      alert("Empresa cadastrada com sucesso!");
      setForm({
        nome: "",
        fantasia: "",
        cnpj: "",
        tipo: "M",
        estado: "",
        cidade: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cep: "",
      });
      console.log(empresaRes.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar empresa");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cadastro de Empresa</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome</label>
          <input type="text" name="nome" className="form-control" value={form.nome} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Nome Fantasia</label>
          <input type="text" name="fantasia" className="form-control" value={form.fantasia} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">CNPJ</label>
          <input type="text" name="cnpj" className="form-control" value={form.cnpj} onChange={handleChange} required />
        </div>

        <div className="col-md-4">
          <label className="form-label">Tipo</label>
          <select name="tipo" className="form-select" value={form.tipo} onChange={handleChange}>
            <option value="O">Organização</option>
            <option value="A">Administrador</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Estado</label>
          <select name="estado" className="form-select" value={form.estado} onChange={handleChange} required>
            <option value="">Selecione um estado</option>
            {estados.map(e => (
              <option key={e.idestado} value={e.idestado}>{e.nome}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Cidade</label>
          <select name="cidade" className="form-select" value={form.cidade} onChange={handleChange} required>
            <option value="">Selecione uma cidade</option>
            {cidades.map(c => (
              <option key={c.idcidade} value={c.idcidade}>{c.nome}</option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Logradouro</label>
          <input type="text" name="logradouro" className="form-control" value={form.logradouro} onChange={handleChange} required />
        </div>

        <div className="col-md-2">
          <label className="form-label">Número</label>
          <input type="text" name="numero" className="form-control" value={form.numero} onChange={handleChange} required />
        </div>

        <div className="col-md-3">
          <label className="form-label">Bairro</label>
          <input type="text" name="bairro" className="form-control" value={form.bairro} onChange={handleChange} required />
        </div>

        <div className="col-md-3">
          <label className="form-label">CEP</label>
          <input type="text" name="cep" className="form-control" value={form.cep} onChange={handleChange} required />
        </div>

        <div className="col-12 mt-3">
          <button type="submit" className="btn btn-primary">Cadastrar Empresa</button>
        </div>
      </form>
    </div>
  );
};

export default EmpresaCadastro;
