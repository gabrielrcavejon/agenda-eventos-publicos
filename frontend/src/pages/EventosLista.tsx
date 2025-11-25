import React, { useEffect, useState } from "react";
import api from "../service/api";
import ModalMensagem from "../components/ModalMensagem"; // importa o modal

interface Endereco {
  idEndereco: number;
  idCidade: number;
  logradouro: string;
  bairro: string;
  cep: string;
  numero: string;
}

interface Evento {
  idEvento: number;
  idEmpresa: number;
  idEndereco: number;
  idUsuarioCriacao: number;
  nome: string;
  status: "P" | "A" | "R"; // Pendente, Aprovado, Reprovado
  descricao: string;
  imagem: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  endereco?: Endereco;
}

const EventosLista: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [modalShow, setModalShow] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventoRes, enderecoRes] = await Promise.all([
          api.get("/evento"),
          api.get("/endereco"),
        ]);

        const enderecosMap: { [key: number]: Endereco } = {};
        enderecoRes.data.enderecos.forEach((end: Endereco) => {
          enderecosMap[end.idEndereco] = end;
        });

        const eventosComEndereco: Evento[] = eventoRes.data.eventos.map(
          (ev: Evento) => ({
            ...ev,
            endereco: enderecosMap[ev.idEndereco] || undefined,
          })
        );

        setEventos(eventosComEndereco);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mudarStatus = async (idEvento: number, novoStatus: "A" | "R") => {
    try {
      const res = await api.put(`/evento/${idEvento}`, { status: novoStatus });
      setEventos((prev) =>
        prev.map((ev) => (ev.idEvento === idEvento ? res.data : ev))
      );
    } catch (error) {
      console.error("Erro ao mudar status:", error);
      alert("Não foi possível mudar o status");
    }
  };

  const handleEnviarMensagem = async (mensagem: string) => {
    if (!eventoSelecionado) return;
    try {
      await api.post("/email", { idEvento: eventoSelecionado.idEvento, mensagem });
      alert("Mensagem enviada!");
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      alert("Não foi possível enviar a mensagem");
    } finally {
      setModalShow(false);
      setEventoSelecionado(null);
    }
  };

  const abrirModal = (evento: Evento) => {
    setEventoSelecionado(evento);
    setModalShow(true);
  };

  if (loading) return <p className="text-center mt-4">Carregando eventos...</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Eventos Cadastrados</h2>
      <div className="row">
        {eventos.map((ev) => (
          <div key={ev.idEvento} className="col-md-6 col-lg-4 mb-4">
            <div
              className={`card shadow-sm border-${
                ev.status === "A"
                  ? "success"
                  : ev.status === "R"
                  ? "danger"
                  : "secondary"
              }`}
            >
              <img src={ev.imagem} className="card-img-top" alt={ev.nome} />
              <div className="card-body">
                <h5 className="card-title">{ev.nome}</h5>
                <p className="card-text">
                  <strong>Status:</strong>{" "}
                  {ev.status === "P"
                    ? "Pendente"
                    : ev.status === "A"
                    ? "Aprovado"
                    : "Reprovado"}
                </p>
                {ev.endereco && (
                  <p className="card-text">
                    <strong>Endereço:</strong> {ev.endereco.logradouro},{" "}
                    {ev.endereco.numero} - {ev.endereco.bairro}, CEP:{" "}
                    {ev.endereco.cep}
                  </p>
                )}
                <p className="card-text">
                  <strong>Descrição:</strong> {ev.descricao}
                </p>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => mudarStatus(ev.idEvento, "A")}
                  >
                    Aprovar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => mudarStatus(ev.idEvento, "R")}
                  >
                    Reprovar
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => abrirModal(ev)}
                  >
                    Mensagem
                  </button>
                </div>
              </div>
              <div className="card-footer text-muted">
                {new Date(ev.dataHoraInicio).toLocaleString()} -{" "}
                {new Date(ev.dataHoraFim).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
        {eventos.length === 0 && (
          <p className="text-center">Nenhum evento cadastrado</p>
        )}
      </div>

      {/* Modal */}
      <ModalMensagem
        show={modalShow}
        onClose={() => setModalShow(false)}
        onSend={handleEnviarMensagem}
        eventoNome={eventoSelecionado?.nome || ""}
      />
    </div>
  );
};

export default EventosLista;
