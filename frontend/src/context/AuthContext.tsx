import { createContext, useContext, useState } from "react";
import api from "../service/api";

interface AuthContextProps {
  usuario: any;
  login: (email: string, senha: string) => Promise<boolean>; 
  logout: () => void; 
}

const AuthContext = createContext<AuthContextProps>(null!);

export const AuthProvider = ({ children }: any) => {
  const [usuario, setUsuario] = useState<any>(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  const login = async (email: string, senha: string) => {
    try {
      const response = await api.post("/login", { email, senha });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario", JSON.stringify(response.data.usuario));

      setUsuario(response.data.usuario);

      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
