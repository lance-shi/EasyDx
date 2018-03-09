import React, { Component } from "react";
import axios from 'axios';
import ProjectList from "../presentational/ProjectList";
import ProjectAdd from "../presentational/ProjectAdd";
import AlertMessage from "../presentational/AlertMessage";

class ProjectContainer extends Component {
	constructor() {
		super();
		this.state = {
			projects: []
		};
		axios.get("/api/project").then((res) => {
            this.setState({
				projects: res.data.projects,
				showAlertMessage: false,
				alertClass: "info",
				alertMessage: ""
	        })
		});

		this.showAlertMessage = this.showAlertMessage.bind(this);
		this.hideAlertMessage = this.hideAlertMessage.bind(this);
		this.removeProject = this.removeProject.bind(this);
	}

	showAlertMessage(alertClass, alertMessage) {
		this.setState({
			showAlertMessage: true,
			alertClass: alertClass,
			alertMessage: alertMessage
		});
	}

	hideAlertMessage() {
		this.setState({
			showAlertMessage: false
		});
	}

	setDefaultProj(project) {
		axios.post("api/defaultProject", {
			alias: project.alias,
			directory: project.directory
		}).then((res) => {
			if(res.status === 200) {
				this.showAlertMessage("success", "Default project set successfully");
				console.log("Default project set successfully");
				this.setState({
					projects: res.data.projects
				});
			} else {
				this.showAlertMessage("danger", "Error:" + res.data.err);
			}
		});
	}

	addProject(project) {
		axios.post("api/project", {
			alias: project.alias,
			directory: project.directory,
			isDefault: project.isDefault
		}).then((res) => {
			if(res.status === 200) {
				this.showAlertMessage("success", "Project added successfully");
				this.setState({
					projects: res.data.projects
				});
			} else {
				this.showAlertMessage("danger", "Error:" + res.data.err);
			}
		});
	}

	removeProject(project) {
		axios.post("api/removeProject", {
			alias: project.alias, 
			directory: project.directory
		}).then((res) => {
			if(res.status === 200) {
				this.showAlertMessage("success", "Project removed successfully");
				this.setState({
					projects: res.data.projects
				});
			} else {
				this.showAlertMessage("danger", "Error:" + res.data.err);
			}
		});
	}

	render() {
		return (
			<div>
				{this.state.showAlertMessage ? <AlertMessage 
					alertClass={this.state.alertClass}
					message={this.state.alertMessage}/> : null}
				<ProjectList projects={this.state.projects}
					setDefaultProj={this.setDefaultProj.bind(this)}
					removeProject={this.removeProject}/>
				<ProjectAdd addProject={this.addProject.bind(this)}
					showAlertMessage={this.showAlertMessage}/>
			</div>
		)
	}
}

export default ProjectContainer;