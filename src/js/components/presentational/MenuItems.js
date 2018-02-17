import React, { Component } from "react";
import MenuItem from "./MenuItem";

class MenuItems extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark navbar-expand-lg">
                <div className="container ">
                    <a className="navbar-brand" href="#"><img src="img/easydxlogo.png" height="30" width="41"/></a>
                    <div className="navbar-collapse collapse" id="conFunMenu">
                        <ul className="navbar-nav mr-auto" >
                            <MenuItem menuName="Org" setActivePanel={this.props.setActivePanel} activePanel={this.props.activePanel}/>
                            <MenuItem menuName="Source" setActivePanel={this.props.setActivePanel} activePanel={this.props.activePanel}/>
                         </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default MenuItems;