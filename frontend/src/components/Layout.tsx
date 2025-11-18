import React from "react";
import Sidebar from "./Sidebar"; // ajuste o caminho
import NavbarSuperior from "./NavbarSuperior";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <NavbarSuperior titulo="Agenda de Eventos" />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
