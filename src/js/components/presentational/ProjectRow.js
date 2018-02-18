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
			<div className="row">
				<div className="col-sm-3">{this.props.project.alias}</div>
				<div className="col-sm-5">{this.props.project.directory}</div>
				<div className="col-sm-2">
					<a href="#" onClick={this.handleSetDefault}>Set as Default Project</a>
				</div>
				<div className="col-sm-2">
					<a href="#" onClick={this.handleConvertCode}>Convert Code</a>
				</div>
			</div>
		);
	} 
} 

export default ProjectRow;