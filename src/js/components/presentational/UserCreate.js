import React, { Component } from "react";
import AliasInput from "./AliasInput";

class UserCreate extends Component {
    constructor() {
        super();

        this.state = {
            alias: "",
            forcePush: false,
            OtherOrg: false
        };

        this.handleOtherOrgChange = this.handleOtherOrgChange.bind(this);
        this.changeAlias = this.changeAlias.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);
    }

    changeAlias(alias) {
        this.setState({alias: alias});
    }

    handleOtherOrgChange(event) {
        this.setState({OtherOrg: !this.state.OtherOrg});
    }

    handleCreateUser() {
        let userName = this.alias;
        if(!this.state.OtherOrg) {
            if(this.props.defaultOrgExist) {
                userName = this.props.currentOrg.username;
            } else {
                this.props.showAlertMessage("danger", "Error: Please specify an org first");
                return;
            }
        }
        this.props.createUser(userName);
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Create User</strong>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Create a user for a scratch org</h6>
                    <div className="row from-group">
                        <div className="checkbox form-check">
                            <input type="checkbox" defaultChecked={this.state.OtherOrg} 
                                onChange={this.handleOtherOrgChange}
                                className="form-check-input form-check-input"/>
                            <label className="form-check-label form-check-label">Create in a non-default org?</label>
                        </div>
                    </div>
                    {this.state.OtherOrg? <AliasInput alias={this.state.alias} changeAlias={this.changeAlias}/>: null}
                    <button type="button" className="btn btn-primary form-button" 
					    onClick={this.handleCreateUser}>Create User</button>
                </div>
            </div>
        );
    }
    
}

export default UserCreate;