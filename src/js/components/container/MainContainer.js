import React, { Component } from "react";
import {BrowserRouter } from "react-router-dom";
import {Switch, Route} from "react-router-dom";

import OrgContainer from "./OrgContainer";
import ProjectContainer from "./ProjectContainer";
import SourceContainer from "./SourceContainer";
import MenuItems from "../presentational/MenuItems";
import Header from "../presentational/Header";

class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            activePanel: "Org"
        };
    }

    setActivePanel(activePanel) {
        this.setState({activePanel: activePanel});
    }
    
    render() {
        return (
            <BrowserRouter>
                <div className="app sidebar-fixed">
                    <div className="app-body">
                        <MenuItems activePanel={this.state.activePanel} setActivePanel={this.setActivePanel.bind(this)}/>
                        <main className="main">
                            <Switch>
                                <Route exact path="/" component={OrgContainer}/>
                                <Route path="/Project" component={ProjectContainer}/>
                                <Route path="/Source" component={SourceContainer}/>
                            </Switch>
                        </main>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default MainContainer;