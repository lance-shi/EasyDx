import React, { Component } from "react";

class MenuItems extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg">
                <div className="container ">
                    <a className="navbar-brand" href="#"><img src="img/easydxlogo.png" height="30" width="41"/></a>
                    <div className="navbar-collapse collapse" id="conFunMenu">
                        <ul className="navbar-nav mr-auto" >
                            <li className="nav-item active"><a className="nav-link" href="#"><span className="fa fa-home fa-lg"></span> Home</a></li>
                            <li className="nav-item"><a className="nav-link" href="#"><span className="fa fa-info fa-lg"></span> About</a></li>
                            <li className="nav-item"><a className="nav-link" href="#"><span className="fa fa-list fa-lg"></span> Menu</a></li>
                            <li className="nav-item"><a className="nav-link" href="#"><span className="fa fa-address-card fa-lg"></span> Contact</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default MenuItems;