import React, { Component } from "react";
import axios from 'axios';

class ProjectRow extends Component {
	constructor() {
		super();
		this.handleSetDefault = this.handleSetDefault.bind(this);
		this.handleConvertCode = this.handleConvertCode.bind(this);
	}

	handleSetDefault() {
		this.props.setDefaultProj(this.props.project);
	}

	handleConvertCode() {
		/*axios.post("/api/org", {
			username: this.props.org.username	
		}).then((res) => {
			console.log('Org opened successfully');
	    });*/
	}

	render() {
		return (
			<tr>
				<td>{this.props.project.alias}</td>
				<td>{this.props.project.directory}</td>
				<td >
					<div className="btn-group">
						<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
							Action
						</button>
						<div className="dropdown-menu">
							<a className="dropdown-item" href="#" onClick={this.handleSetDefault}>Set as Default Project</a>
							<a className="dropdown-item" href="#" onClick={this.handleConvertCode}>Convert Code</a>
						</div>
					</div>
				</td>
			</tr>
		);
	} 
} 

export default ProjectRow;