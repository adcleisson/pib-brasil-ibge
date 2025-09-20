import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navBg = theme === "light" ? "#001a85" : "#000000";
    const navBorder = theme === "light" ? "#ccc" : "#374151";
    const linkColor = theme === "light" ? "#ffffff" : "#b3deff";
    const activeColor = "#007bff";
    const burgerColor = theme === "light" ? "#ffffff" : "#fff";

    return (
        <>
            <nav style={{ backgroundColor: navBg, borderBottom: `1px solid ${navBorder}`, padding: "10px 20px", position: "relative" }}>
                <div className="nav-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div className="logo" style={{ fontWeight: "bold", fontSize: "1.5rem", color: linkColor }}>Dashboard</div>

                    <button
                        className="burger"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menu"
                        style={{
                            display: "none",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            width: "25px",
                            height: "18px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
            <span className="line line1" style={{
                height: "3px",
                background: burgerColor,
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
            }}></span>
                        <span className="line line2" style={{
                            height: "3px",
                            background: burgerColor,
                            borderRadius: "2px",
                            transition: "all 0.3s ease",
                            opacity: isOpen ? 0 : 1
                        }}></span>
                        <span className="line line3" style={{
                            height: "3px",
                            background: burgerColor,
                            borderRadius: "2px",
                            transition: "all 0.3s ease",
                            transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"
                        }}></span>
                    </button>

                    {/* Links Desktop */}
                    <div className="links-desktop" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                        <NavLink to="/" end style={({ isActive }) => ({
                            textDecoration: "none",
                            color: isActive ? activeColor : linkColor,
                            fontWeight: 500
                        })}>
                            Gráficos
                        </NavLink>
                        <NavLink to="/table" style={({ isActive }) => ({
                            textDecoration: "none",
                            color: isActive ? activeColor : linkColor,
                            fontWeight: 500
                        })}>
                            Tabela
                        </NavLink>


                        <div style={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}>
                            <span style={{ marginRight: "0.5rem", fontSize: "0.875rem"}}>
                                {theme === "light" ? "☀" : "🌑"}
                            </span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={theme === "dark"}
                                    onChange={toggleTheme}
                                />
                                <span className="slider"></span>
                                <span className="knob"></span>
                            </label>
                            <style>
                              {`
                                .switch {
                                  position: relative;
                                  display: inline-block;
                                  width: 48px; 
                                  height: 24px;
                                  cursor: pointer;
                                }
                                .switch input {
                                  opacity: 0;
                                  width: 0;
                                  height: 0;
                                  position: absolute;
                                }
                                .slider {
                                  position: absolute;
                                  top: 0;
                                  left: 0;
                                  right: 0;
                                  bottom: 0;
                                  background-color: ${theme === "light" ? "#bfbfbf" : "#4e4e4e"};
                                  border-radius: 999px;
                                  transition: background-color 0.3s;
                                }
                                .knob {
                                  position: absolute;
                                  top: 0;
                                  left: ${theme === "dark" ? "24px" : "0px"};
                                  width: 24px;
                                  height: 24px;
                                  background-color: ${theme === "light" ? "#FFFFFF" : "#007bff"};
                                  border-radius: 50%;
                                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                                  transition: left 0.3s, background-color 0.3s;
                                }
                             `}
                            </style>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "10px",
                    maxHeight: isOpen ? "200px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                    gap: "10px"
                }}>
                    <NavLink to="/" end onClick={() => setIsOpen(false)} style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? activeColor : linkColor,
                        padding: "10px 0",
                        fontWeight: 500
                    })}>
                        Gráficos
                    </NavLink>
                    <NavLink to="/table" onClick={() => setIsOpen(false)} style={({ isActive }) => ({
                        textDecoration: "none",
                        color: isActive ? activeColor : linkColor,
                        padding: "10px 0",
                        fontWeight: 500
                    })}>
                        Tabela
                    </NavLink>


                    <div style={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}>
                            <span style={{ marginRight: "0.5rem", fontSize: "0.875rem"}}>
                                {theme === "light" ? "☀" : "🌑"}
                            </span>
                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={theme === "dark"}
                                onChange={toggleTheme}
                            />
                            <span className="slider"></span>
                            <span className="knob"></span>
                        </label>
                        <style>
                            {`
                                .switch {
                                  position: relative;
                                  display: inline-block;
                                  width: 48px; 
                                  height: 24px;
                                  cursor: pointer;
                                }
                                .switch input {
                                  opacity: 0;
                                  width: 0;
                                  height: 0;
                                  position: absolute;
                                }
                                .slider {
                                  position: absolute;
                                  top: 0;
                                  left: 0;
                                  right: 0;
                                  bottom: 0;
                                  background-color: ${theme === "light" ? "#bfbfbf" : "#4e4e4e"};
                                  border-radius: 999px;
                                  transition: background-color 0.3s;
                                }
                                .knob {
                                  position: absolute;
                                  top: 0;
                                  left: ${theme === "dark" ? "24px" : "0px"};
                                  width: 24px;
                                  height: 24px;
                                  background-color: ${theme === "light" ? "#FFFFFF" : "#007bff"};
                                  border-radius: 50%;
                                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                                  transition: left 0.3s, background-color 0.3s;
                                }
                             `}
                        </style>
                    </div>
                </div>
            </nav>


            <style>{`
        @media (max-width: 768px) {
          .burger {
            display: flex !important;
          }
          .links-desktop {
            display: none !important;
          }
        }
      `}</style>
        </>
    );
}
