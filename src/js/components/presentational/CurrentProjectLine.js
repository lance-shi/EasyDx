import React, { Component } from "react";
import { Link } from "react-router-dom";

class CurrentProjectLine extends Component {
    render() {
        return (
            <div className="section-group">
                <div className="row">
                    <h3>Current Project</h3>
                </div>
                <div className="row">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Alias</th>
                                <th>Directory</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.project.alias}</td>
                                <td>{this.props.project.directory}</td>
                                <td><Link to="/Project">Change</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CurrentProjectLine;