import React, { Component } from "react";
import {BrowserRouter } from "react-router-dom";
import {Switch, Route} from "react-router-dom";

import OrgContainer from "./OrgContainer";
import ProjectContainer from "./ProjectContainer";
import SourceContainer from "./SourceContainer";
import MenuItems from "../presentational/MenuItems";

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
                <div className="container-fluid" id="wrapper">
                    <div className="row">
                        <MenuItems activePanel={this.state.activePanel} setActivePanel={this.setActivePanel.bind(this)}/>
                        <main className="col-sm-8 offset-sm-4 col-lg-9 offset-lg-3 col-xl-10 offset-xl-2 pt-3 pl-4">
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