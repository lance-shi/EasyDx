import React, { Component } from "react";

class OrgDetails extends Component {
    render() {
        let connectionStatus = "success";
        if(this.props.org.connectedStatus === "Connected") {
            connectionStatus = "success";
        } else if(this.props.org.connectedStatus === "Unknown") {
            connectionStatus = "secondary"
        } else {
            connectionStatus = "danger";
        }

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
                                    <td>{this.props.org.username}</td>
                                </tr>
                                <tr>
                                    <td>Alias: </td>
                                    <td>{this.props.org.alias}</td>
                                </tr>
                                <tr>
                                    <td>Org Id: </td>
                                    <td>{this.props.org.orgId}</td>
                                </tr>
                                <tr>
                                    <td>Connected Status: </td>
                                    <td>
                                        <span className={"badge badge-" + connectionStatus}>{this.props.org.connectedStatus}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Instance Url: </td>
                                    <td>{this.props.org.instanceUrl}</td>
                                </tr>
                                <tr>
                                    <td>Login Url: </td>
                                    <td>{this.props.org.loginUrl}</td>
                                </tr>
                                <tr>
                                    <td>Last Used: </td>
                                    <td>{this.props.org.lastUsed}</td>
                                </tr>
                                <tr>
                                    <td>Expiration Date: </td>
                                    <td>{this.props.org.expirationDate}</td>
                                </tr>
                                <tr>
                                    <td>DevHub User Name: </td>
                                    <td>{this.props.org.devHubUsername}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default OrgDetails;