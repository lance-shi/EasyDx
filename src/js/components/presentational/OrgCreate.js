import React, { Component } from "react";

class OrgCreate extends Component {
    constructor() {
        super();

        this.state = {
            alias: "",
            isDefault: false
        };

        this.handleAliasChange = this.handleAliasChange.bind(this);
        this.handleDefaultChange = this.handleDefaultChange.bind(this);
        this.handleCreateOrg = this.handleCreateOrg.bind(this);
    }

    handleAliasChange(event) {
        this.setState({alias: event.target.value});
    }

    handleDefaultChange(event) {
        this.setState({isDefault: !this.state.isDefault});
    }

    handleCreateOrg() {
        this.props.createOrg(this.state.isDefault, this.state.alias);
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Create Org</strong>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Create a Scratch Org</h6>
                    <div className="row from-group">
                        <div className="checkbox form-check">
                            <input type="checkbox" defaultChecked={this.state.isDefault} 
                                onChange={this.handleDefaultChange} className="form-check-input form-check-input"/>
                            <label className="form-check-label form-check-label">Is it the default org?</label>
                        </div>
                    </div>
                    <div className="card-footer todo-list-footer">
                        <div className="input-group">
                            <input type="text" className="form-control input-md" placeholder="Alias" value={this.state.alias} 
                                onChange={this.handleAliasChange}/>
                            <span className="input-group-btn">
                                <button className="btn btn-primary btn-md" onClick={this.handleCreateOrg}>Create</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default OrgCreate;