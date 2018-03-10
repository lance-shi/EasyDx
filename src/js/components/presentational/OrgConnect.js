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

    render() {
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <h3 className="card-title">Connect Org</h3>
                    <h6 className="card-subtitle mb-2 text-muted">Connect to a production org or sandbox</h6>
                    <ul className="mt-2 pl-0">
                        <li className="todo-list-item">
                            <div className="form-check">
                                <input type="checkbox" defaultChecked={this.state.isSandbox} 
                                    onChange={this.handleSandboxChange}/>
                                <label>Is it a sandbox?</label>
                            </div>
                        </li>
                        <li className="todo-list-item">
                            <div className="form-check">
                                <input type="checkbox" defaultChecked={this.state.isDevhub} 
                                    onChange={this.handleDevHubChange}/>
                                <label>Is it the default devhub?</label>
                            </div>
                        </li>
                    </ul>
                    <div className="card-footer todo-list-footer">
                        <div className="input-group">
                            <input type="text" className="form-control input-md" placeholder="Alias" value={this.state.alias} 
                                onChange={this.handleAliasChange}/>
                            <span className="input-group-btn">
                                <button className="btn btn-primary btn-md">Connect</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default OrgConnect;