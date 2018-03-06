import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class MenuItems extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg">
                <div className="container ">
                    <div className="navbar-collapse collapse" id="conFunMenu">
                        <ul className="navbar-nav mr-auto" >
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
                    </div>
                </div>
            </nav>
        );
    }
}

export default MenuItems;