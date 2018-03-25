import React, { Component } from "react";
import AliasInput from "./AliasInput";

class UserRefresh extends Component {
    constructor() {
        super();

        this.state = {
            alias: "",
            forcePush: false,
            OtherOrg: false
        };

        this.handleOtherOrgChange = this.handleOtherOrgChange.bind(this);
        this.changeAlias = this.changeAlias.bind(this);
        this.handleRefreshUser = this.handleRefreshUser.bind(this);
    }

    changeAlias(alias) {
        this.setState({alias: alias});
    }

    handleOtherOrgChange(event) {
        this.setState({OtherOrg: !this.state.OtherOrg});
    }

    handleRefreshUser() {
        let userName = this.alias;
        if(!this.state.OtherOrg) {
            if(this.props.defaultOrgExist) {
                userName = this.props.currentOrg.username;
            } else {
                this.props.showAlertMessage("danger", "Error: Please specify an org first");
                return;
            }
        }
        this.props.refreshUserList(userName);
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Retrieve Users</strong>
                </div>
                <div className="card-body">
                    <div className="row from-group">
                        <div className="checkbox form-check">
                            <input type="checkbox" defaultChecked={this.state.OtherOrg} 
                                onChange={this.handleOtherOrgChange}
                                className="form-check-input form-check-input"/>
                            <label className="form-check-label form-check-label">Retrieve from a non-default org?</label>
                        </div>
                    </div>
                    {this.state.OtherOrg? <AliasInput alias={this.state.alias} changeAlias={this.changeAlias}/>: null}
                    <button type="button" className="btn btn-primary form-button" 
					    onClick={this.handleRefreshUser}>Get User List</button>
                </div>
            </div>
        );
    }
    
}

export default UserRefresh;