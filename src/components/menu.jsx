import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <style>{`
         {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        nav {
          background-color: #fff;
          border-bottom: 1px solid #ccc;
          padding: 10px 20px;
          position: relative;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-weight: bold;
          font-size: 1.5rem;
        }

        .links-desktop {
          display: flex;
          gap: 20px;
        }

        .links-desktop a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
        }

        .links-desktop a.active {
          color: #007bff;
        }

        .burger {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 25px;
          height: 18px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .line {
          height: 3px;
          background: #333;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .line1.open {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .line2.open {
          opacity: 0;
        }

        .line3.open {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        .links-mobile {
          display: none;
          flex-direction: column;
          margin-top: 10px;
        }

        .links-mobile a {
          text-decoration: none;
          color: #333;
          padding: 10px 0;
          font-weight: 500;
        }

        .links-mobile a.active {
          color: #007bff;
        }

        @media (max-width: 768px) {
          .burger {
            display: flex;
          }

          .links-desktop {
            display: none;
          }

          .links-mobile.open {
            display: flex;
          }
        }
      `}</style>

            <nav>
                <div className="nav-container ">
                    <div className="logo">Meu Dashboard</div>

                    <button
                        className="burger"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                    >
                        <span className={isOpen ? "line line1 open" : "line line1"}></span>
                        <span className={isOpen ? "line line2 open" : "line line2"}></span>
                        <span className={isOpen ? "line line3 open" : "line line3"}></span>
                    </button>

                    <div className="links-desktop">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            Gráficos
                        </NavLink>
                        <NavLink
                            to="/table"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            Tabelas
                        </NavLink>
                    </div>
                </div>

                <div className={isOpen ? "links-mobile open" : "links-mobile"}>
                    <NavLink
                        to="/"
                        end
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Gráficos
                    </NavLink>
                    <NavLink
                        to="/table"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Tabelas
                    </NavLink>
                </div>
            </nav>
        </>
    );
}
