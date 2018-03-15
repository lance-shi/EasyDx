import React, { Component } from "react";
import axios from 'axios';

import OrgListCard from "../presentational/OrgListCard";
import OrgDetails from "../presentational/OrgDetails";
import LoadingImage from "../presentational/LoadingImage";
import AlertMessage from "../presentational/AlertMessage";
import CurrentProjectLine from "../presentational/CurrentProjectLine";
import CurrentProjectNotExist from "../presentational/CurrentProjectNotExist";
import PageHeader from "../presentational/PageHeader";
import OrgConnect from "../presentational/OrgConnect";
import OrgCreate from "../presentational/OrgCreate";

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
		this.setDefaultOrg = this.setDefaultOrg.bind(this);
		this.connectOrg = this.connectOrg.bind(this);
		this.createOrg = this.createOrg.bind(this);
	}

	handleRefreshOrgs(e) {
		if(!this.state.defaultProjectExists) {
			this.showAlertMessage("danger", "Error: Please specify a default project first");
			return;
		}
		this.setState({showLoaidngImage: true});
		axios.post("/api/listOrg", {
            directory: this.state.currentProject.directory
        }).then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
	            this.setState({
					showLoaidngImage: false,
		        	scratchOrgs: result.scratchOrgs,
					nonScratchOrgs: result.nonScratchOrgs
				});
				this.showAlertMessage("success", "Org list refreshed successfully!");
	        } else {
				this.toggleLoadingImage(false);
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
	}

	connectOrg(isDevHub, isSandbox, alias) {
		this.setState({showLoaidngImage: true});
		axios.post("/api/connectOrg", {
			isDevHub: isDevHub,
			isSandbox: isSandbox,
			alias: alias
        }).then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
	            this.setState({
					showLoaidngImage: false
				});
				this.showAlertMessage("success", "Org connected successfully!");
	        } else {
				this.toggleLoadingImage(false);
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
	}

	createOrg(isDefault, alias) {
		if(!this.state.defaultProjectExists) {
			this.showAlertMessage("danger", "Error: Please specify a default project first");
			return;
		}
		this.setState({showLoaidngImage: true});
		axios.post("/api/createOrg", {
			isDefault: isDefault,
			directory: this.state.currentProject.directory,
			alias: alias
        }).then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
	            this.setState({
					showLoaidngImage: false
				});
				this.showAlertMessage("success", "Scratch org created successfully!");
	        } else {
				this.toggleLoadingImage(false);
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
	}

	setDefaultOrg(defaultUserName) {
		if(!this.state.defaultProjectExists) {
			this.showAlertMessage("danger", "Error: Please specify the default project first");
			return;
		}

		this.toggleLoadingImage(true);
		axios.post("api/defaultOrg", {
			username: defaultUserName,
			directory: this.state.currentProject.directory
		}).then((res) => {
			if(res.status === 200) {
				this.toggleLoadingImage(false);
				this.showAlertMessage("success", "Default org set successfully");
				for(let i = 0; i < this.state.scratchOrgs.length; i++) {
					if(this.state.scratchOrgs[i].username !== defaultUserName) {
						this.state.scratchOrgs[i].defaultMarker = "";
					} else {
						this.state.scratchOrgs[i].defaultMarker = "(U)";
					}
				}
				for(let i = 0; i < this.state.nonScratchOrgs.length; i++) {
					if(this.state.nonScratchOrgs[i].defaultMarker !== "(D)") {
						if(this.state.nonScratchOrgs[i].username !== defaultUserName) {
							this.state.nonScratchOrgs[i].defaultMarker = "";
						} else {
							this.state.nonScratchOrgs[i].defaultMarker = "(U)";
						}
					}
				}
				this.setState ({
					scratchOrgs: this.state.scratchOrgs,
					nonScratchOrgs: this.state.nonScratchOrgs
				});
			} else {
				this.toggleLoadingImage(false);
				this.showAlertMessage("danger", "Error:" + res.data.err);
			}
		});
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
				<PageHeader title="Org"/>
				{this.state.showAlertMessage ? <AlertMessage 
					alertClass={this.state.alertClass}
					message={this.state.alertMessage}/> : null}
				<div class="container-fluid">
					<div className="row">
						<div className="col-md-12 col-lg-8">
							{this.state.defaultProjectExists ? <CurrentProjectLine 
								project={this.state.currentProject}/> : <CurrentProjectNotExist/>}
							<OrgListCard scratchOrgs={this.state.scratchOrgs} 
								nonScratchOrgs={this.state.nonScratchOrgs}
								setDetailOrg={this.setDetailOrg.bind(this)}
								toggleLoadingImage={this.toggleLoadingImage}
								showAlertMessage={this.showAlertMessage}
								setDefaultOrg={this.setDefaultOrg}
								handleRefreshOrgs={this.handleRefreshOrgs.bind(this)}/>
						</div>
						<div className="col-md-12 col-lg-4">
							<OrgConnect connectOrg={this.connectOrg}/>
							<OrgCreate createOrg={this.createOrg}/>
							<div id="orgDetailsSection">
								{this.state.showDetailOrg ? <OrgDetails org={this.state.detailOrg}/> : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default OrgContainer;