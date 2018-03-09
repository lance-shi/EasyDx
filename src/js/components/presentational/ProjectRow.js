import React, { Component } from "react";
import axios from 'axios';

class ProjectRow extends Component {
	constructor(props) {
		super(props);
		this.handleSetDefault = this.handleSetDefault.bind(this);
		this.handleConvertCode = this.handleConvertCode.bind(this);
		this.handleRemoveProject = this.handleRemoveProject.bind(this);
	}

	handleSetDefault() {
		this.props.setDefaultProj(this.props.project);
	}

	handleConvertCode() {
		axios.post("api/convertProject", {
			directory: this.props.project.directory
		}).then((res) => {
			if(res.status === 200) {
				console.log("Project converted successfully!");
			} else {
				console.log("Error: " + res.data.err);
			}
		});
	}

	handleRemoveProject() {
		this.props.removeProject(this.props.project);
	}

	render() {
		let defaultMarker = "";
		if(this.props.project.isDefault) {
			defaultMarker = "(D)";
		}

		return (
			<tr>
				<td>{defaultMarker}</td>
				<td>{this.props.project.alias}</td>
				<td>{this.props.project.directory}</td>
				<td >
					<div className="btn-group">
						<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
							Action
						</button>
						<div className="dropdown-menu">
							<a className="dropdown-item" href="#/" onClick={this.handleSetDefault}>Set as Default Project</a>
							<a className="dropdown-item" href="#/" onClick={this.handleConvertCode}>Convert Code</a>
							<a className="dropdown-item" href="#/" onClick={this.handleRemoveProject}>Remove Project</a>
						</div>
					</div>
				</td>
			</tr>
		);
	} 
} 

export default ProjectRow;