import React, { Component } from "react";
import { Link } from "react-router-dom";

class CurrentProjectNotExist extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="mb-4">Current Project</h1>
                <p>
                    Default project is not specified
                </p>
                <p>
                    Please specify a default project or create a new one. 
                </p>
                <p className="lead"><Link to="/Project" className="btn btn-primary btn-md mt-2">Set Default Project</Link></p>
            </div>
        );
    }
}

export default CurrentProjectNotExist;