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
import OrgChangeAlias from "../presentational/OrgChangeAlias";

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

		axios.get("/api/org").then((res) => {
			let orgs = res.data.orgs;

            this.setState({
				nonScratchOrgs: orgs.nonScratchOrgs,
				scratchOrgs: orgs.scratchOrgs
	        })
		});

		this.toggleLoadingImage = this.toggleLoadingImage.bind(this);
		this.showAlertMessage = this.showAlertMessage.bind(this);
		this.hideAlertMessage = this.hideAlertMessage.bind(this);
		this.setDefaultOrg = this.setDefaultOrg.bind(this);
		this.setDefaultDevhub = this.setDefaultDevhub.bind(this);
		this.connectOrg = this.connectOrg.bind(this);
		this.createOrg = this.createOrg.bind(this);
		this.deleteOrg = this.deleteOrg.bind(this);
		this.changeAlias = this.changeAlias.bind(this);
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
		if(!this.state.defaultProjectExists) {
			this.showAlertMessage("danger", "Error: Please specify a default project first");
			return;
		}
		this.toggleLoadingImage(true);
		axios.post("/api/connectOrg", {
			isDevHub: isDevHub,
			isSandbox: isSandbox,
			alias: alias,
			directory: this.state.currentProject.directory
        }).then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
	            this.setState({
					showLoaidngImage: false
				});
				this.showAlertMessage("success", "Please input your user name and password in the opening tab and you will be connected successfully!");
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
		this.toggleLoadingImage(true);
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

	deleteOrg(orgName) {
		this.toggleLoadingImage(true);
		axios.post("/api/deleteOrg", {
			orgName: orgName
        }).then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
	            this.setState({
					showLoaidngImage: false
				});
				this.showAlertMessage("success", "Org removed successfully!");
				for(let i = 0; i < this.state.scratchOrgs.length; i++) {
					if(this.state.scratchOrgs[i].username === orgName) {
						this.state.scratchOrgs.splice(i, 1);
						this.setState ({
							scratchOrgs: this.state.scratchOrgs
						});
						return;
					}
				}
				for(let i = 0; i < this.state.nonScratchOrgs.length; i++) {
					if(this.state.nonScratchOrgs[i].username === orgName) {
						this.state.nonScratchOrgs.splice(i, 1);
						this.setState ({
							nonScratchOrgs: this.state.nonScratchOrgs
						});
						return;
					}
				}
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
				let orgObj = {};
				orgObj.orgs = {};
				orgObj.orgs.scratchOrgs = this.state.scratchOrgs;
				orgObj.orgs.nonScratchOrgs = this.state.nonScratchOrgs;
				axios.post("api/writeOrgFile", {
					orgObj: orgObj
				}).then((res)=>{});
			} else {
				this.toggleLoadingImage(false);
				this.showAlertMessage("danger", "Error:" + res.data.err);
			}
		});
	}

	setDefaultDevhub(orgName) {
		if(!this.state.defaultProjectExists) {
			this.showAlertMessage("danger", "Error: Please specify the default project first");
			return;
		}

		this.toggleLoadingImage(true);
		axios.post("api/defaultDevhub", {
			username: orgName,
			directory: this.state.currentProject.directory
		}).then((res) => {
			if(res.status === 200) {
				this.toggleLoadingImage(false);
				this.showAlertMessage("success", "Default devhub set successfully");
				for(let i = 0; i < this.state.nonScratchOrgs.length; i++) {
					if(this.state.nonScratchOrgs[i].username !== orgName) {
						this.state.nonScratchOrgs[i].defaultMarker = "";
					} else {
						this.state.nonScratchOrgs[i].defaultMarker = "(D)";
					}
				}
				this.setState ({
					nonScratchOrgs: this.state.nonScratchOrgs
				});
			} else {
				this.toggleLoadingImage(false);
				this.showAlertMessage("danger", "Error:" + res.data.err);
			}
		});
	}

	changeAlias(alias, userName) {
		this.toggleLoadingImage(true);
		axios.post("api/changeAlias", {
			userName: userName,
			alias: alias
		}).then((res) => {
			if(res.status === 200) {
				this.toggleLoadingImage(false);
				this.showAlertMessage("success", "Alias successfully set");
				for(let i = 0; i < this.state.nonScratchOrgs.length; i++) {
					if(this.state.nonScratchOrgs[i].username === userName) {
						this.state.nonScratchOrgs[i].alias = alias;
					} 
				}
				for(let i = 0; i < this.state.scratchOrgs.length; i++) {
					if(this.state.scratchOrgs[i].username === userName) {
						this.state.scratchOrgs[i].alias = alias;
					} 
				}
				this.setState ({
					nonScratchOrgs: this.state.nonScratchOrgs,
					scratchOrgs: this.state.scratchOrgs
				});
				
				let orgObj = {};
				orgObj.orgs = {};
				orgObj.orgs.scratchOrgs = this.state.scratchOrgs;
				orgObj.orgs.nonScratchOrgs = this.state.nonScratchOrgs;
				axios.post("api/writeOrgFile", {
					orgObj: orgObj
				}).then((res)=>{});
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
				<div className="container-fluid">
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
								setDefaultDevhub={this.setDefaultDevhub}
								handleRefreshOrgs={this.handleRefreshOrgs.bind(this)}
								deleteOrg={this.deleteOrg}/>
						</div>
						<div className="col-md-12 col-lg-4">
							<OrgConnect connectOrg={this.connectOrg}/>
							<OrgCreate createOrg={this.createOrg}/>
							<OrgChangeAlias changeAlias={this.changeAlias}/>
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