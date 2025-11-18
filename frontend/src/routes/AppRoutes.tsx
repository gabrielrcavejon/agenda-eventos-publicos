import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Layout from "../components/Layout";
import EmpresaCadastro from "../pages/EmpresaCadastro";

const RotaPrivada = ({ children }: any) => {
  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/login" />;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <RotaPrivada>
              <Layout>
                <Dashboard />
              </Layout>
            </RotaPrivada>
          }
        />

        <Route
          path="/empresa"
          element={
            <RotaPrivada>
              <Layout>
                <EmpresaCadastro />
              </Layout>
            </RotaPrivada>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
