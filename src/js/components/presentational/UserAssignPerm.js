import React, { Component } from "react";

class UserAssignPerm extends Component {
    constructor() {
        super();

        this.state = {
            permissionName: "",
            userName: ""
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePermissionChange = this.handlePermissionChange.bind(this);
        this.handleAssignPermission = this.handleAssignPermission.bind(this);
    }

    handleUserChange(event) {
        this.setState({userName: event.target.value});
    }

    handlePermissionChange(event) {
        this.setState({permissionName: event.target.value});
    }

    handleAssignPermission() {
        this.props.assignPermission(this.state.userName, this.state.permissionName);
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Assign Permission</strong>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Assign Permission to a User</h6>
                    <div className="row from-group input-bar">
                        <label>Please specify the user name or alias</label>
                        <input type="text" className="form-control" value={this.state.userName} 
                            onChange={this.handleUserChange}/>
                    </div>
                    <div className="row from-group input-bar">
                        <label>Please specify the permission set name</label>
                        <input type="text" className="form-control" value={this.state.permissionName} 
                            onChange={this.handlePermissionChange}/>
                    </div>
                    <button type="button" className="btn btn-primary form-button" 
					    onClick={this.handleAssignPermission}>Assign Permission</button>
                </div>
            </div>
        );
    }
    
}

export default UserAssignPerm;