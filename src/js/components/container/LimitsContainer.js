import React, { Component } from "react";
import axios from 'axios';

import LoadingImage from "../presentational/LoadingImage";
import AlertMessage from "../presentational/AlertMessage";
import CurrentProjectLine from "../presentational/CurrentProjectLine";
import CurrentProjectNotExist from "../presentational/CurrentProjectNotExist";
import PageHeader from "../presentational/PageHeader";
import LimitsRetrieve from "../presentational/LimitsRetrieve";
import LimitsResult from "../presentational/LimitsResult";

class LimitsContainer extends Component {
	constructor() {
		super();
		this.state = {
			currentProject: {},
			defaultProjectExists: false,
			showLoaidngImage: false,
			showAlertMessage: false,
			alertClass: "info",
			alertMessage: "",
			limitsList: []
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
        this.retrieveLimits = this.retrieveLimits.bind(this);
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
    
    retrieveLimits(otherOrg, alias) {
		if(!this.state.defaultProjectExists) {
			this.showAlertMessage("danger", "Error: Please specify a default project first");
			return;
		}
		this.setState({showLoaidngImage: true});
		axios.post("/api/retrieveLimits", {
			directory: this.state.currentProject.directory,
			otherOrg: otherOrg,
			alias: alias
        }).then((res) => {
			if(res.status === 200) {
				this.toggleLoadingImage(false);
				let result = res.data.result;
				this.setState({
					limitsList: result
				});
				this.showAlertMessage("success", "Org Limits displayed as in below");
	        } else {
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
    }

	render() {
		return (
			<div>
				{this.state.showLoaidngImage ? <LoadingImage/> : null}
				<PageHeader title="Limits"/>
				{this.state.showAlertMessage ? <AlertMessage 
					alertClass={this.state.alertClass}
					message={this.state.alertMessage}/> : null}
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 col-lg-8">
							{this.state.defaultProjectExists ? <CurrentProjectLine 
								project={this.state.currentProject}/> : <CurrentProjectNotExist/>}
							<LimitsResult limitsList={this.state.limitsList}/>
						</div>
						<div className="col-md-12 col-lg-4">
							<LimitsRetrieve retrieveLimits={this.retrieveLimits}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default LimitsContainer;