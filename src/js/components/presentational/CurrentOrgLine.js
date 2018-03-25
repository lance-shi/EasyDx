import React, { Component } from "react";
import { Link } from "react-router-dom";

class CurrentOrgLine extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="mb-4">Current Org</h1>
                <p>
                    <strong>Alias: </strong>{this.props.org.alias}
                </p>
                <p>
                    <strong>User Name: </strong>{this.props.org.username}
                </p>
                <p className="lead"><Link to="/" className="btn btn-primary btn-md mt-2">Change</Link></p>
            </div>
        );
    }
}

export default CurrentOrgLine;