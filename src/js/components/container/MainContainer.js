import React, { Component } from "react";
import OrgContainer from "./OrgContainer";
import SourceContainer from "./SourceContainer";
import MenuItems from "../presentational/MenuItems";

class MainContainer extends Component {
    constructor() {
        super();
        this.state = {
            showOrgPanel: true,
            showSourcePanel: false,
            activePanel: "Org"
        };
		//this.handleShowDetail = this.handleShowDetail.bind(this);
    }
    
    render() {
        return (
            <div>
                <MenuItems activePanel={this.props.activePanel}/>
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
                    {this.state.showOrgPanel ? <OrgContainer/> : null}
                    {this.state.showSourcePanel ? <SourceContainer/> : null}
                </div>
            </div>
        );
    }
}

export default MainContainer;