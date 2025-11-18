import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";

interface NavbarSuperiorProps {
  titulo: string;
}

const NavbarSuperior = ({ titulo }: NavbarSuperiorProps) => {
  const { usuario, logout } = useAuth();
  const userImage = usuario?.foto || "/sem-foto.png"; // fallback se não tiver foto

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded-lg mb-4 px-4 py-3">
      <div className="container-fluid justify-content-between align-items-center">
        <span
          style={{ color: "#254060" }}
          className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2"
        >
          {titulo}
        </span>

        <div
          className="d-flex align-items-center gap-3 position-relative"
          ref={menuRef}
        >
          <span className="text-muted d-none d-md-inline">{usuario?.nome}</span>

          <img
            className="rounded-circle"
            src={userImage}
            alt="Imagem de perfil"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              cursor: "pointer",
              imageRendering: "crisp-edges",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          />

          {menuOpen && (
            <div
              className="position-absolute bg-white shadow rounded py-2"
              style={{
                top: "60px",
                right: 0,
                minWidth: "150px",
                zIndex: 9999,
              }}
            >
              <button
                className="btn btn-link text-danger w-100 text-start text-decoration-none"
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarSuperior;
