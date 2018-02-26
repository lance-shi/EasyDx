import React, { Component } from "react";
import OrgContainer from "./OrgContainer";
import ProjectContainer from "./ProjectContainer";
import MenuItems from "../presentational/MenuItems";
import {BrowserRouter } from "react-router-dom";
import {Switch, Route} from "react-router-dom";

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
                <div>
                    <MenuItems activePanel={this.state.activePanel} setActivePanel={this.setActivePanel.bind(this)}/>
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-1 icon-div">
                                    <span className="far fa-file-alt fa-lg"></span>
                                </div>
                                <div className="col-sm-6">
                                    <h1 className="display-4">Easy DX </h1>
                                    <p>UI Interface for Salesforce DX</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={OrgContainer}/>
                            <Route path="/Project" component={ProjectContainer}/>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default MainContainer;