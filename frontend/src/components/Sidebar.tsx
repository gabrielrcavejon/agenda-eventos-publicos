import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar: React.FC = () => {
  const { usuario } = useAuth();
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();

  if (!usuario) return null; // evita renderizar sem usuário

  // Define links com base no tipo de usuário
  const links =
    usuario.tipo === "A"
      ? [
          { to: "/dashboard", label: "Home", icon: "bi-house-door-fill" },
          { to: "/empresa", label: "Cadastro Empresa", icon: "bi-buildings-fill" },
          { to: "/eventos", label: "Lista de Eventos", icon: "bi-calendar-event-fill" },
        ]
      : [
          { to: "/eventos", label: "Lista de Eventos", icon: "bi-calendar-event-fill" },
          { to: "/evento", label: "Cadastro Evento", icon: "bi-calendar-plus-fill" },
        ];

  return (
    <div
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
    >
      {/* Cabeçalho do Sidebar */}
      <div className="sidebar-header-blue d-flex align-items-center justify-content-center py-2">
        <img src="src/public/logo.png" alt="Logo" style={{ width: "120px" }} />
      </div>

      <hr className="text-white mt-0" />

      {/* Lista de links */}
      <ul className="nav flex-column flex-grow-1">
        {links.map((link, idx) => (
          <li className="nav-item" key={idx}>
            <Link
              to={link.to}
              className={`nav-link sidebar-link-blue ${
                location.pathname === link.to ? "active" : ""
              }`}
            >
              <i className={`bi ${link.icon} fs-5 sidebar-icon-solid`}></i>
              {!collapsed && <span className="ms-2">{link.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;