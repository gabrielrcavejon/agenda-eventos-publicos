// EventoCadastro.tsx
import React, { useEffect, useState } from "react";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";

interface Estado {
  idestado: number;
  nome: string;
}

interface Cidade {
  idcidade: number;
  nome: string;
}

const categoriasOpcoes = [
  { id: "rock", label: "Show de Rock" },
  { id: "educacao", label: "Educação" },
  { id: "teatro", label: "Teatro" },
  { id: "conferencia", label: "Conferência" },
  { id: "outros", label: "Outros" },
];

const EventoCadastro: React.FC = () => {
  const { usuario } = useAuth();

  const [estados, setEstados] = useState<Estado[]>([]);
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    imagem: "",
    dataHoraInicio: "",
    dataHoraFim: "",
    estado: "",
    cidade: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
  });

  useEffect(() => {
    api.get("/estado").then(res => setEstados(res.data.dados));
    api.get("/cidade").then(res => setCidades(res.data.dados));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoriaChange = (id: string) => {
    setCategorias(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;

    try {
      const enderecoRes = await api.post("/endereco", {
        logradouro: form.logradouro,
        numero: form.numero,
        bairro: form.bairro,
        cep: form.cep,
        idcidade: form.cidade,
      });
      const idEndereco = enderecoRes.data.endereco.idEndereco;

      await api.post("/evento", {
        idEmpresa: usuario.idEmpresa,
        idUsuarioCriacao: usuario.id,
        idEndereco,
        nome: form.nome,
        descricao: form.descricao,
        imagem: form.imagem,
        dataHoraInicio: form.dataHoraInicio,
        dataHoraFim: form.dataHoraFim,
        status: "P",
        categorias, // adiciona categorias selecionadas
      });

      alert("Evento cadastrado com sucesso!");
      setForm({
        nome: "",
        descricao: "",
        imagem: "",
        dataHoraInicio: "",
        dataHoraFim: "",
        estado: "",
        cidade: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cep: "",
      });
      setCategorias([]);
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar evento");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Cadastro de Evento</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nome do Evento</label>
          <input type="text" name="nome" className="form-control" value={form.nome} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Imagem (URL)</label>
          <input type="text" name="imagem" className="form-control" value={form.imagem} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Data e Hora Início</label>
          <input type="datetime-local" name="dataHoraInicio" className="form-control" value={form.dataHoraInicio} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Data e Hora Fim</label>
          <input type="datetime-local" name="dataHoraFim" className="form-control" value={form.dataHoraFim} onChange={handleChange} required />
        </div>

        <div className="col-12">
          <label className="form-label">Descrição</label>
          <textarea name="descricao" className="form-control" value={form.descricao} onChange={handleChange} rows={3} required />
        </div>

        {/* Categorias */}
        <div className="col-12">
          <label className="form-label">Categorias</label>
          <div className="d-flex flex-wrap">
            {categoriasOpcoes.map(cat => (
              <div key={cat.id} className="form-check me-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={cat.id}
                  checked={categorias.includes(cat.id)}
                  onChange={() => handleCategoriaChange(cat.id)}
                />
                <label className="form-check-label" htmlFor={cat.id}>
                  {cat.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Endereço */}
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
          <button type="submit" className="btn btn-primary">Cadastrar Evento</button>
        </div>
      </form>
    </div>
  );
};

export default EventoCadastro;
