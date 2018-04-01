import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class MenuItems extends Component {
    render() {
        return (
            <nav className="sidebar">
                <h4 className="site-title">
                    <Link to="/" className="nav-link">
                        <span className="fa fa-rocket"></span> Easy DX
                    </Link>
                </h4>
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink to="/" exact activeClassName="active" className="nav-link">
                            <span className="fa fa-home fa-lg"></span> Org
                        </NavLink> 
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Project" activeClassName="active" className="nav-link">
                            <span className="fas fa-cloud-download-alt fa-lg"></span> Project
                        </NavLink> 
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Create" activeClassName="active" className="nav-link">
                            <span className="fas fa-plus-circle fa-lg"></span> Create
                        </NavLink> 
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Source" activeClassName="active" className="nav-link">
                            <span className="fas fa-code fa-lg"></span> Source
                        </NavLink> 
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Limits" activeClassName="active" className="nav-link">
                            <span className="fas fa-list fa-lg"></span> Limits
                        </NavLink> 
                    </li>
                    <li className="nav-item">
                        <NavLink to="/User" activeClassName="active" className="nav-link">
                            <span className="far fa-user fa-lg"></span> User
                        </NavLink> 
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Package" activeClassName="active" className="nav-link">
                            <span className="fas fa-archive fa-lg"></span> Package
                        </NavLink> 
                    </li>
                </ul>
            </nav>
        );
    }
}

export default MenuItems;