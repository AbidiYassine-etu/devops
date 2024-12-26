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
                                to="/admin"
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
                                to="/addEmployee"
                            >
                                <i className="icon fas fa-cart-plus"></i>
                                <span className="text">Ajouter Employée</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/validateConge"
                            >
                                <i className="icon fas fa-bags-shopping"></i>
                                <span className="text">Validation Congés</span>
                            </NavLink>
                        </li>
                        <li className="menu-item">
                            <NavLink
                                activeClassName="active"
                                className="menu-link"
                                to="/validateFeuille"
                            >
                                <i className="icon fas fa-bags-shopping"></i>
                                <span className="text">Validation Feuille</span>
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

export default Sidebar;