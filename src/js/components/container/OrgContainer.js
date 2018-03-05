import React, { Component } from "react";
import axios from 'axios';

import OrgList from "../presentational/OrgList";
import OrgDetails from "../presentational/OrgDetails";
import LoadingImage from "../presentational/LoadingImage";
import AlertMessage from "../presentational/AlertMessage";
import CurrentProjectLine from "../presentational/CurrentProjectLine";

class OrgContainer extends Component {
	constructor() {
		super();
	this.state = {
			scratchOrgs: [],
			nonScratchOrgs: [],
			detailOrg: {},
			currentProject: {},
			defaultProjectExists: false,
			showDetailOrg: false,
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
	}

	handleRefreshOrgs(e) {
		this.setState({showLoaidngImage: true});
		axios.get("/api/org").then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
	            this.setState({
					showLoaidngImage: false,
		        	scratchOrgs: result.scratchOrgs,
					nonScratchOrgs: result.nonScratchOrgs
				});
				this.showAlertMessage("success", "Org list refreshed successfully!");
	        } else {
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
	}

	setDefaultOrg(defaultUserName) {

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

	setDetailOrg(org) {
		this.setState({
			detailOrg: org,
			showDetailOrg: true
		});
	}

	toggleLoadingImage(displayLoadingImage) {
		this.setState({
			showLoaidngImage: displayLoadingImage
		});
	}

	render() {
		return (
			<div>
				{this.state.showLoaidngImage ? <LoadingImage/> : null}
				{this.state.showAlertMessage ? <AlertMessage 
					alertClass={this.state.alertClass}
					message={this.state.alertMessage}/> : null}
				{this.state.defaultProjectExists ? <CurrentProjectLine 
					project={this.state.currentProject}/> : null}
				<OrgList orgs={this.state.nonScratchOrgs} title="Non Scratch Orgs" 
					setDetailOrg={this.setDetailOrg.bind(this)}
					toggleLoadingImage={this.toggleLoadingImage}
					showAlertMessage={this.showAlertMessage}/>
				<OrgList orgs={this.state.scratchOrgs} title="Scratch Orgs"
					setDetailOrg={this.setDetailOrg.bind(this)}
					toggleLoadingImage={this.toggleLoadingImage}
					showAlertMessage={this.showAlertMessage}/>
				<button id="orgInfo" type="button" className="btn btn-primary" 
					onClick={this.handleRefreshOrgs.bind(this)}>Refresh Org List</button>
				{this.state.showDetailOrg ? <OrgDetails org={this.state.detailOrg}/> : null}
			</div>
		)
	}
}

export default OrgContainer;