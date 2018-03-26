import React, { Component } from "react";

class UserDetail extends Component {
    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Org Details</strong>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td>User Name:</td>
                                    <td>{this.props.user.username}</td>
                                </tr>
                                <tr>
                                    <td>Alias: </td>
                                    <td>{this.props.user.alias}</td>
                                </tr>
                                <tr>
                                    <td>User Id: </td>
                                    <td>{this.props.user.userId}</td>
                                </tr>
                                <tr>
                                    <td>Instance Url: </td>
                                    <td>
                                        {this.props.user.instanceUrl}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Login Url: </td>
                                    <td>{this.props.user.loginUrl}</td>
                                </tr>
                                <tr>
                                    <td>Org Id: </td>
                                    <td>{this.props.user.orgId}</td>
                                </tr>
                                <tr>
                                    <td>Profile: </td>
                                    <td>{this.props.user.profileName}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default UserDetail;