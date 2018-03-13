import React, { Component } from "react";

class SourceRow extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<tr>
				<td><span className="badge badge-danger">{this.props.source.state}</span></td>
				<td>{this.props.source.operation}</td>
				<td>{this.props.source.fullName}</td>
				<td>{this.props.source.type}</td>
				<td>{this.props.source.filePath}</td>
			</tr>
		);
	} 
}

export default SourceRow;