import React, { Component } from "react";
import { Link } from "react-router-dom";

class CurrentProjectLine extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="mb-4">Current Project</h1>
                <p>
                    <strong>Alias: </strong>{this.props.project.alias}
                </p>
                <p>
                    <strong>Directory: </strong>{this.props.project.directory}
                </p>
                <p className="lead"><Link to="/Project" className="btn btn-primary btn-md mt-2">Change</Link></p>
            </div>
        );
    }
}

export default CurrentProjectLine;