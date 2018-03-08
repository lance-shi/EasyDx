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
            <div className="section-group">
                <div className="row">
                    <h3>{this.props.org.alias?this.props.org.alias:"Anonymous"}</h3>
                </div>
                <div className="row">
                    <div className="col-sm-3">User Name: </div>
                    <div className="col-sm-6">{this.props.org.username}</div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Alias: </div>
                    <div className="col-sm-6">{this.props.org.alias}</div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Org Id: </div>
                    <div className="col-sm-6">{this.props.org.orgId}</div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Connected Status: </div>
                    <div className="col-sm-6">
                        <span className={"badge badge-" + connectionStatus}>{this.props.org.connectedStatus}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Instance Url: </div>
                    <div className="col-sm-6">{this.props.org.instanceUrl}</div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Login Url: </div>
                    <div className="col-sm-6">{this.props.org.loginUrl}</div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Last Used: </div>
                    <div className="col-sm-6">{this.props.org.lastUsed}</div>
                </div>
                <div className="row">
                    <div className="col-sm-3">Expiration Date: </div>
                    <div className="col-sm-6">{this.props.org.expirationDate}</div>
                </div>
                <div className="row">
                    <div className="col-sm-3">DevHub User Name: </div>
                    <div className="col-sm-6">{this.props.org.devHubUsername}</div>
                </div>
            </div>
        );
    }
    
}

export default OrgDetails;