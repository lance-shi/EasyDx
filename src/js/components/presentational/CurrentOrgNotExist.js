import React, { Component } from "react";
import { Link } from "react-router-dom";

class CurrentOrgNotExist extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="mb-4">Current Org</h1>
                <p>
                    Default org is not specified or is not a scratch org
                </p>
                <p className="lead"><Link to="/" className="btn btn-primary btn-md mt-2">Set Default Org</Link></p>
            </div>
        );
    }
}

export default CurrentOrgNotExist;