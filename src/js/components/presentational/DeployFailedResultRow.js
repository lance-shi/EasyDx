import React, { Component } from "react";

class DeployFailedResultRow extends Component {
	render() {
		return (
			<tr>
                <td><span className="badge badge-danger">{this.props.failedResult.state}</span></td>
				<td>{this.props.failedResult.columnNumber}</td>
				<td>{this.props.failedResult.lineNumber}</td>
				<td>{this.props.failedResult.error}</td>
				<td>{this.props.failedResult.fullName}</td>
                <td>{this.props.failedResult.type}</td>
                <td>{this.props.failedResult.filePath}</td>
			</tr>
		);
	} 
}

export default DeployFailedResultRow;