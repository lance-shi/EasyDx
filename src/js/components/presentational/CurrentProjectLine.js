import React, { Component } from "react";

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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.props.project.alias}</td>
                                <td>{this.props.project.directory}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CurrentProjectLine;