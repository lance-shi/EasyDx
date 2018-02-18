import React, { Component } from "react";
import axios from 'axios';
import ProjectList from "../presentational/ProjectList";

class ProjectContainer extends Component {
	constructor() {
		super();
		this.state = {
			projects: [],
			defaultProject: null
		};
		axios.get("/api/project").then((res) => {
            this.setState({
	        	projects: res.data.projects
	        })
		});
	}

	setDefaultProj(project) {
		this.setState({
			defaultProject: project
		})
	}

	render() {
		return (
			<ProjectList projects={this.state.projects} setDefaultProj={this.setDefaultProj.bind(this)}/>
		)
	}
}

export default ProjectContainer;