import React, { Component } from "react";
import axios from 'axios';

import LoadingImage from "../presentational/LoadingImage";
import AlertMessage from "../presentational/AlertMessage";
import CurrentProjectLine from "../presentational/CurrentProjectLine";
import SourceListCard from "../presentational/SourceListCard";
import SourcePush from "../presentational/SourcePush";
import PageHeader from "../presentational/PageHeader";

class SourceContainer extends Component {
	constructor() {
		super();
	    this.state = {
            remoteChanges: [],
            localChanges: [],
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
        this.setState({showLoaidngImage: true});
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

                    if(resultState.includes("Local Changed")) {
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
				toggleLoadingImage(false);
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
	}

	pushChanges(forcePush, otherOrg, alias) {
		this.setState({showLoaidngImage: true});
		axios.post("/api/pushSource", {
			directory: this.state.currentProject.directory,
			force: forcePush
        }).then((res) => {
			if(res.status === 200) {
                let result = res.data.result;

	            this.toggleLoadingImage(false);
				this.showAlertMessage("success", "Source status pushed successfully!");
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
				<section className="row">
					<div className="col-md-12 col-lg-8">
						{this.state.defaultProjectExists ? <CurrentProjectLine 
							project={this.state.currentProject}/> : null}
						<SourceListCard remoteChanges={this.state.remoteChanges}
							localChanges={this.state.localChanges}
							handleRefreshStatus={this.handleRefreshStatus.bind(this)}/>
					</div>
					<div className="col-md-12 col-lg-4">
						<SourcePush pushChanges={this.pushChanges}/>
					</div>
				</section>
            </div>
        )
    }
}

export default SourceContainer;