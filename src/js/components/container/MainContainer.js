import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import {Switch, Route} from "react-router-dom";

import OrgContainer from "./OrgContainer";
import ProjectContainer from "./ProjectContainer";
import CreateContainer from "./CreateContainer";
import SourceContainer from "./SourceContainer";
import LimitsContainer from "./LimitsContainer";
import UserContainer from "./UserContainer";
import PackageContainer from "./PackageContainer";
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
            <HashRouter>
                <div className="app sidebar-fixed">
                    <div className="app-body">
                        <MenuItems activePanel={this.state.activePanel} setActivePanel={this.setActivePanel.bind(this)}/>
                        <main className="main">
                            <Switch>
                                <Route exact path="/" component={OrgContainer}/>
                                <Route path="/Project" component={ProjectContainer}/>
                                <Route path="/Create" component={CreateContainer}/>
                                <Route path="/Source" component={SourceContainer}/>
                                <Route path="/Limits" component={LimitsContainer}/>
                                <Route path="/User" component={UserContainer}/>
                                <Route path="/Package" component={PackageContainer}/>
                            </Switch>
                        </main>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default MainContainer;