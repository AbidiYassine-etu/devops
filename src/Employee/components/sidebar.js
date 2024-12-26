import React from "react";
import {Link , NavLink} from "react-router-dom";

const Sidebar = () =>{
    return (
        <div>
            <aside className="navbar-aside" id="offcanvas_aside">
                <div className="aside-top">
                    <Link to="/" className="brand-wrap">
                        <img
                            src="/images/black.png"
                            style={{ height: "50"}}
                            className="logo"
                            alt="Ecommerce dashboard template"
                        />
                    </Link>
                    <div>
                        <button className="btn btn-icon btn-aside-minimize">
                            <i className="text-muted fas fa-stream"></i>
                        </button>
                    </div>
                </div>
                <nav>
                    <ul className="menu-aside">
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/employees"
                                exact={true}
                                >
                                <i className="icon fas fa-home"></i>
                                <span className="text">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/addConges"
                            >
                                <i className="icon fas fa-calendar-plus"></i>
                                <span className="text">Ajouter Congé</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/congesList"
                            >
                                <i className="icon fas fa-suitcase-rolling"></i>

                                <span className="text">Liste Congés</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/addFeuille"
                            >
                                <i className="icon fas fa-calendar-plus"></i>

                                <span className="text">Ajouter Temps</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/feuilleList"
                            >
                                <i className="icon fas fa-suitcase-rolling"></i>

                                <span className="text">Liste Temps</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/users"
                            >
                                <i className="icon fas fa-user"></i>
                                <span className="text">Employées</span>
                            </NavLink>
                        </li>
                    </ul>
                    <br />
                    <br />
                </nav>
            </aside>
        </div>
    );
};


const styles = {
    sidebar: {
        backgroundColor: "#1E3A8A", // Bleu sombre
        height: "100vh",
        width: "250px",
        color: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        overflowY: "auto",
    },
    asideTop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px 20px",
    },
    brand: {
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
    },
    logo: {
        height: "50px",
        margin: "auto",
    },
    menu: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
    },
    menuItem: {
        marginBottom: "10px",
    },
    link: {
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        textDecoration: "none",
        color: "#B0C4DE",
        transition: "all 0.3s ease",
    },
    activeLink: {
        backgroundColor: "#2563EB", // Couleur active
        color: "#fff",
        fontWeight: "bold",
        borderLeft: "4px solid #93C5FD", // Indicateur actif
    },
    icon: {
        marginRight: "10px",
        fontSize: "16px",
    },
    text: {
        fontSize: "14px",
    },
};

export default Sidebar;