import React, { Component } from "react";
import axios from 'axios';
import ProjectList from "../presentational/ProjectList";
import ProjectAdd from "../presentational/ProjectAdd";

class ProjectContainer extends Component {
	constructor() {
		super();
		this.state = {
			projects: []
		};
		axios.get("/api/project").then((res) => {
            this.setState({
	        	projects: res.data.projects
	        })
		});
	}

	setDefaultProj(project) {
		axios.post("api/defaultProject", {
			alias: project.alias,
			directory: project.directory
		}).then((res) => {
			if(res.status === 200) {
				console.log("Default project set successfully");
				this.setState({
					projects: res.data.projects
				});
			} else {
				console.log("Error: " + res.data.err);
			}
		});
	}

	addProject(project) {
		axios.post("api/project", {
			alias: project.alias,
			directory: project.directory,
			isDefault: false
		}).then((res) => {
			if(res.status === 200) {
				console.log("Project added successfully");
				this.setState({
					projects: res.data.projects
				});
			} else {
				console.log("Error: " + res.data.err);
			}
		});
	}

	render() {
		return (
			<div>
				<ProjectList projects={this.state.projects}
					setDefaultProj={this.setDefaultProj.bind(this)}/>
				<ProjectAdd addProject={this.addProject.bind(this)}/>
			</div>
		)
	}
}

export default ProjectContainer;