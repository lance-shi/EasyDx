import React, { Component } from "react";

class MenuItem extends Component {
    handleClickMenu(e) {
        this.props.setActivePanel(this.props.menuName);
    }

    render() {
        return (
            <li className={this.props.activePanel===this.props.menuName?"active nav-item":"nav-item"}>
                <a className="nav-link" href="#" onClick={this.handleClickMenu.bind(this)}>
                    <span className="fa fa-home fa-lg"></span> {this.props.menuName}
                </a>
            </li>
        );
    }
}

export default MenuItem;