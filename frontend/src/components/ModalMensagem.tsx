import React, { useState } from "react";

interface ModalMensagemProps {
  show: boolean;
  onClose: () => void;
  onSend: (mensagem: string) => void;
  eventoNome: string;
}

const ModalMensagem: React.FC<ModalMensagemProps> = ({ show, onClose, onSend, eventoNome }) => {
  const [mensagem, setMensagem] = useState("");

  if (!show) return null;

  const handleEnviar = () => {
    onSend(mensagem);
    setMensagem(""); // limpa o campo após enviar
    onClose();
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enviar mensagem - {eventoNome}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <textarea
              className="form-control"
              rows={5}
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Digite sua mensagem..."
            ></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleEnviar}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMensagem;
