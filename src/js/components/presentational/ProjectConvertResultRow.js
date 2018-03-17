import React, { Component } from "react";

class ProjectConvertResultRow extends Component {
	constructor() {
		super();
	}

	render() {
        let badgeClass = "success";
        if(this.props.convertResult.state === "Duplicate") {
            badgeClass = "danger";
        }
		return (
			<tr>
				<td><span className={"badge badge-" + badgeClass}>{this.props.convertResult.state}</span></td>
				<td>{this.props.convertResult.fullName}</td>
				<td>{this.props.convertResult.type}</td>
				<td>{this.props.convertResult.filePath}</td>
			</tr>
		);
	} 
}

export default ProjectConvertResultRow;