import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class MenuItems extends Component {
    render() {
        return (
            <nav className="sidebar col-sm-4 col-lg-3 col-xl-2 bg-faded">
                <h1 className="site-title"><a href="#"><span className="fa fa-rocket"></span> Easy DX</a></h1>
                <ul className="nav nav-pills flex-column sidebar-nav">
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
                        <NavLink to="/Source" activeClassName="active" className="nav-link">
                            <span className="fas fa-code fa-lg"></span> Code
                        </NavLink> 
                    </li>
                </ul>
            </nav>
        );
    }
}

export default MenuItems;