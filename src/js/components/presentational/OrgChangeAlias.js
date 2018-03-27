import React, { Component } from "react";

class OrgChangeAlias extends Component {
    constructor() {
        super();

        this.state = {
            alias: "",
            userName: ""
        };

        this.handleAliasChange = this.handleAliasChange.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleChangeAlias = this.handleChangeAlias.bind(this);
    }

    handleAliasChange(event) {
        this.setState({alias: event.target.value});
    }

    handleUserNameChange(event) {
        this.setState({userName: event.target.value});
    }

    handleChangeAlias() {
        this.props.changeAlias(this.state.alias, this.state.userName);
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Change Org Alias</strong>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Set or Reset Alias for an Org</h6>
                    <div className="row from-group input-bar">
                        <label>Please specify the org's user name</label>
                        <input type="text" className="form-control" value={this.state.userName} 
                            onChange={this.handleUserNameChange}/>
                    </div>
                    <div className="card-footer todo-list-footer">
                        <div className="input-group">
                            <input type="text" className="form-control input-md" placeholder="Alias" value={this.state.alias} 
                                onChange={this.handleAliasChange}/>
                            <span className="input-group-btn">
                                <button className="btn btn-primary btn-md" onClick={this.handleChangeAlias}>Change Alias</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default OrgChangeAlias;