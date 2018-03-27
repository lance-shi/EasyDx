import React, { Component } from "react";
import axios from 'axios';

import LoadingImage from "../presentational/LoadingImage";
import AlertMessage from "../presentational/AlertMessage";
import CurrentProjectLine from "../presentational/CurrentProjectLine";
import CurrentProjectNotExist from "../presentational/CurrentProjectNotExist";
import SourceListCard from "../presentational/SourceListCard";
import SourcePush from "../presentational/SourcePush";
import SourcePull from "../presentational/SourcePull";
import SourceRetrieve from "../presentational/SourceRetrieve";
import PageHeader from "../presentational/PageHeader";
import ProjectConvertResult from "../presentational/ProjectConvertResult";
import DeployFailedResult from "../presentational/DeployFailedResult";

class SourceContainer extends Component {
	constructor() {
		super();
	    this.state = {
            remoteChanges: [],
			localChanges: [],
			pushedSource: [],
			showPushedSource: false,
			deploymentFailures: [],
			showFailedResult: false,
			pushedTitle: "Pushed Source",
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
		this.pushChanges = this.pushChanges.bind(this);
		this.pullChanges = this.pullChanges.bind(this);
		this.retrieveMetadata = this.retrieveMetadata.bind(this);
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
    
    handleRefreshStatus() {
		if(!this.state.defaultProjectExists) {
			this.showAlertMessage("danger", "Error: Please specify a default project first");
			return;
		}
        this.setState({
			showLoaidngImage: true,
			showPushedSource: false,
			showFailedResult: false
		});
		axios.post("/api/source", {
            directory: this.state.currentProject.directory
        }).then((res) => {
			if(res.status === 200) {
                let result = res.data.result;
                let remoteChanges = [];
                let localChanges = [];

                for(let i = 0; i < result.length; i++) {
                    let resultState = result[i].state;
                    if(resultState.includes("(Conflict)")) {
                        result[i].state = "Conflict";
                    } else {
                        result[i].state = "";
					}
					
					if(resultState.includes("Add")) {
						result[i].operation = "Add";
					} else if(resultState.includes("Delete")) {
						result[i].operation = "Delete";
					} else {
						result[i].operation = "Change";
					}

                    if(resultState.includes("Local")) {
                        localChanges.push(result[i]);
                    } else {
                        remoteChanges.push(result[i]);
                    }
                }
	            this.setState({
					showLoaidngImage: false,
		        	remoteChanges: remoteChanges,
					localChanges: localChanges
				});
				this.showAlertMessage("success", "Source status refreshed successfully!");
	        } else {
				this.toggleLoadingImage(false);
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
	}

	pushChanges(forcePush, otherOrg, alias) {
		if(!this.state.defaultProjectExists) {
			this.showAlertMessage("danger", "Error: Please specify a default project first");
			return;
		}
		this.setState({
			showLoaidngImage: true,
			remoteChanges: [],
			localChanges: [],
			deploymentFailures: [],
			showFailedResult: false,
			pushedSource: [],
			showPushedSource: false
		});
		axios.post("/api/pushSource", {
			directory: this.state.currentProject.directory,
			force: forcePush,
			otherOrg: otherOrg, 
			alias: alias
        }).then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
				this.setState({
					pushedSource: result.pushedSource,
					showPushedSource: true,
					pushedTitle: "Pushed Source"
				});

	            this.toggleLoadingImage(false);
				this.showAlertMessage("success", "Changes pushed successfully into org! Please view details at the bottom of the page");
	        } else {
				this.toggleLoadingImage(false);
				this.showAlertMessage("danger", "Error: " + res.data.message + " Please see detailed results at the bottom of the page");
				let { result, partialSuccess } = res.data;
				if(partialSuccess !== null && partialSuccess !== undefined) {
					this.setState({
						pushedSource: partialSuccess,
						showPushedSource: true,
						pushedTitle: "Partial Success"
					});
				}

				this.setState({
					deploymentFailures: result,
					showFailedResult: true
				});
	        }
		});
	}

	pullChanges(forcePull, otherOrg, alias) {
		if(!this.state.defaultProjectExists) {
			this.showAlertMessage("danger", "Error: Please specify a default project first");
			return;
		}

		this.setState({
			showLoaidngImage: true,
			remoteChanges: [],
			localChanges: [],
			deploymentFailures: [],
			showFailedResult: false,
			pushedSource: [],
			showPushedSource: false
		});
		axios.post("/api/pullSource", {
			directory: this.state.currentProject.directory,
			force: forcePull,
			otherOrg: otherOrg, 
			alias: alias
        }).then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
				this.setState({
					pushedSource: result.pulledSource,
					showPushedSource: true,
					pushedTitle: "Pulled Source"
				});

	            this.toggleLoadingImage(false);
				this.showAlertMessage("success", "Changes status pulled successfully from org!");
	        } else {
				this.toggleLoadingImage(false);
				this.showAlertMessage("danger", "Error: " + res.data.message + " Please see detailed results at the bottom of the page");
				let { result, partialSuccess } = res.data;
				if(partialSuccess !== null && partialSuccess !== undefined) {
					this.setState({
						pushedSource: partialSuccess,
						showPushedSource: true,
						pushedTitle: "Partial Success"
					});
				}

				this.setState({
					deploymentFailures: result,
					showFailedResult: true
				});
	        }
		});
	}

	retrieveMetadata(otherOrg, alias, packageName) {
		if(!this.state.defaultProjectExists) {
			this.showAlertMessage("danger", "Error: Please specify a default project first");
			return;
		}
		this.setState({showLoaidngImage: true});
		axios.post("/api/retrieveSource", {
			directory: this.state.currentProject.directory,
			otherOrg: otherOrg,
			alias: alias,
			packageName: packageName
        }).then((res) => {
			if(res.status === 200) {
	            this.toggleLoadingImage(false);
				this.showAlertMessage("success", "Metadata retrieved successfully at inputTmp!");
	        } else {
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
	}

    render() {
        return (
			<div>
				{this.state.showLoaidngImage ? <LoadingImage/> : null}
				<PageHeader title="Source"/>
				{this.state.showAlertMessage ? <AlertMessage 
					alertClass={this.state.alertClass}
					message={this.state.alertMessage}/> : null}
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 col-lg-8">
							{this.state.defaultProjectExists ? <CurrentProjectLine 
								project={this.state.currentProject}/> : <CurrentProjectNotExist/>}
							<SourceListCard remoteChanges={this.state.remoteChanges}
								localChanges={this.state.localChanges}
								handleRefreshStatus={this.handleRefreshStatus.bind(this)}/>
							{this.state.showFailedResult ? <DeployFailedResult title="Deployment Failures"
								deploymentFailures={this.state.deploymentFailures}/>: null}
							{this.state.showPushedSource ? <ProjectConvertResult title={this.state.pushedTitle}
								convertResults={this.state.pushedSource}/>: null}
						</div>
						<div className="col-md-12 col-lg-4">
							<SourcePush pushChanges={this.pushChanges}/>
							<SourcePull pullChanges={this.pullChanges}/>
							<SourceRetrieve retrieveMetadata={this.retrieveMetadata}/>
						</div>
					</div>
				</div>
            </div>
        )
    }
}

export default SourceContainer;