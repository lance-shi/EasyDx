import React, { Component } from "react";
import axios from 'axios';

import LoadingImage from "../presentational/LoadingImage";
import AlertMessage from "../presentational/AlertMessage";
import CurrentProjectLine from "../presentational/CurrentProjectLine";
import CurrentProjectNotExist from "../presentational/CurrentProjectNotExist";
import PageHeader from "../presentational/PageHeader";
import CreatePanel from "../presentational/CreatePanel";
import CreateLightning from "../presentational/CreateLightning";

class CreateContainer extends Component {
	constructor() {
		super();
		this.state = {
			currentProject: {},
			defaultProjectExists: false,
			showLoaidngImage: false,
			showAlertMessage: false,
			alertClass: "info",
			alertMessage: ""
		};

		axios.get("/api/project").then((res) => {
			let projects = res.data.projects;
			let defaultExists = false;
			let defaultProject = {};
			for(let i = 0; i < projects.length; i++) {
				if(projects[i].isDefault) {
					defaultExists = true;
					defaultProject = projects[i];
					break;
				}
			}
            this.setState({
				currentProject: defaultProject,
				defaultProjectExists: defaultExists
	        })
		});

		this.toggleLoadingImage = this.toggleLoadingImage.bind(this);
		this.showAlertMessage = this.showAlertMessage.bind(this);
        this.hideAlertMessage = this.hideAlertMessage.bind(this);
        this.createMethod = this.createMethod.bind(this);
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

	toggleLoadingImage(displayLoadingImage) {
		this.setState({
			showLoaidngImage: displayLoadingImage
		});
    }

    createMethod(methodName, componentName) {
        if(!this.state.defaultProjectExists) {
			this.showAlertMessage("danger", "Error: Please specify a default project first");
			return;
		}
        this.setState({showLoaidngImage: true});
		axios.post("/api/create", {
            directory: this.state.currentProject.directory,
            methodName: methodName,
            componentName: componentName
        }).then((res) => {
			if(res.status === 200) {
                let result = res.data.result;
                this.toggleLoadingImage(false);
				this.showAlertMessage("success", `${methodName} successfully created at ${result.outputDir}`);
	        } else {
				this.toggleLoadingImage(false);
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
    }

	render() {
		return (
			<div>
				{this.state.showLoaidngImage ? <LoadingImage/> : null}
				<PageHeader title="Create"/>
				{this.state.showAlertMessage ? <AlertMessage 
					alertClass={this.state.alertClass}
					message={this.state.alertMessage}/> : null}
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 col-lg-8">
							{this.state.defaultProjectExists ? <CurrentProjectLine 
                                project={this.state.currentProject}/> : <CurrentProjectNotExist/>}
						</div>
						<div className="col-md-12 col-lg-4">
                            <CreatePanel createMethod={this.createMethod}/>
							<CreateLightning createMethod={this.createMethod}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CreateContainer;