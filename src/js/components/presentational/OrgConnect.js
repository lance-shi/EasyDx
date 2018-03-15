import React, { Component } from "react";

class OrgConnect extends Component {
    constructor() {
        super();

        this.state = {
            alias: "",
            isDevhub: false,
            isSandbox: false
        };

        this.handleSandboxChange = this.handleSandboxChange.bind(this);
        this.handleDevHubChange = this.handleDevHubChange.bind(this);
        this.handleAliasChange = this.handleAliasChange.bind(this);
        this.handleConnectOrg = this.handleConnectOrg.bind(this);
    }

    handleAliasChange(event) {
        this.setState({alias: event.target.value});
    }

    handleDevHubChange(event) {
        this.setState({isDevhub: !this.state.isDevhub});
    }

    handleSandboxChange(event) {
        this.setState({isSandbox: !this.state.isSandbox});
    }

    handleConnectOrg() {
        this.props.connectOrg(this.state.isDevhub, this.state.isSandbox, this.state.alias);
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Connect Org</strong>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Connect to a production org or sandbox</h6>
                    <div className="row from-group">
                        <div className="checkbox form-check">
                            <input type="checkbox" defaultChecked={this.state.isSandbox} 
                                onChange={this.handleSandboxChange} className="form-check-input form-check-input"/>
                            <label className="form-check-label form-check-label">Is it a sandbox?</label>
                        </div>
                    </div>
                    <div className="row from-group">
                        <div className="checkbox form-check">
                            <input type="checkbox" defaultChecked={this.state.isDevhub} 
                                onChange={this.handleDevHubChange} className="form-check-input form-check-input"/>
                            <label className="form-check-label form-check-label">Is it the default devhub?</label>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="input-group">
                            <input type="text" className="form-control input-md" placeholder="Alias" value={this.state.alias} 
                                onChange={this.handleAliasChange}/>
                            <span className="input-group-btn">
                                <button className="btn btn-primary btn-md" onClick={this.handleConnectOrg}>Connect</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default OrgConnect;