import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    const sucesso = await login(email, senha);
    if (!sucesso) {
      setErro("E-mail ou senha inválidos!");
      return;
    }

    // usuario vem para o contexto
  const user = JSON.parse(localStorage.getItem("usuario")!);

  if (user.tipo === "A") {
    navigate("/dashboard");
  } else {
    navigate("/evento");
  }
  };

  return (
    <div
      className="container-fluid vh-100 d-flex p-0"
      style={{ background: "#e9ecef" }} // ⬅️ FUNDO CINZA NA TELA TODA
    >
      <div className="row w-100 m-0">
        
        {/* LADO ESQUERDO */}
        <div
          id="login"
          className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5"
          style={{ background: "#0d6efd" }} // ⬅️ azul igual bootstrap
        >
          <img
            src="/src/public/logo.png"
            alt="Logo"
            style={{ width: "450px", marginBottom: "20px" }}
          />
          <h1 className="display-5 fw-bold text-center">Bem-vindo de volta!</h1>
          <p className="text-center mt-3">
            Entre com sua conta e aproveite tudo que preparamos para você.
          </p>
        </div>

        {/* LADO DIREITO COM CARD */}
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div
            className="card p-4 shadow rounded-4"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h4 className="text-center mb-4 fw-bold text-dark">Login</h4>

            {erro && (
              <div className="alert alert-danger text-center py-2" role="alert">
                {erro}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted">Email</label>
                <input
                  type="email"
                  className="form-control rounded-pill"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-muted">Senha</label>
                <input
                  type="password"
                  className="form-control rounded-pill"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill fw-semibold"
              >
                Entrar
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
