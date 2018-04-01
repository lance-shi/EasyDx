import React, { Component } from "react";
import axios from 'axios';

import LoadingImage from "../presentational/LoadingImage";
import AlertMessage from "../presentational/AlertMessage";
import CurrentProjectLine from "../presentational/CurrentProjectLine";
import CurrentProjectNotExist from "../presentational/CurrentProjectNotExist";
import PageHeader from "../presentational/PageHeader";
import Package2Create from "../presentational/Package2Create";
import Package2List from "../presentational/Package2List";

class PackageContainer extends Component {
	constructor() {
		super();
		this.state = {
			currentProject: {},
			defaultProjectExists: false,
			showLoaidngImage: false,
			showAlertMessage: false,
			alertClass: "info",
            alertMessage: "",
            packageList: []
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
        this.createPackage = this.createPackage.bind(this);
        this.handleRefreshPackages = this.handleRefreshPackages.bind(this);
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
    
    createPackage(packageType, packageName, description) {
        if(!this.state.defaultProjectExists) {
            this.showAlertMessage("danger", "Error: Please specify a default project first");
            return;
        }
        this.toggleLoadingImage(true);
        axios.post("/api/createPackage2", {
            packageName: packageName,
            packageType: packageType,
            description: description,
            directory: this.state.currentProject.directory,
            alias: alias
        }).then((res) => {
            if(res.status === 200) {
                let result = res.data.result;
                this.state.packageList.push(result);
                this.setState({
                    showLoaidngImage: false
                });
                this.showAlertMessage("success", "Package created successfully!");
            } else {
                this.toggleLoadingImage(false);
                this.showAlertMessage("danger", "Error:" + res.data.err);
            }
        });
    }

    handleRefreshPackages() {

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
                            <Package2List packageList={this.state.packageList}
                                handleRefreshPackages={this.handleRefreshPackages}/>
						</div>
						<div className="col-md-12 col-lg-4">
                            <Package2Create createPackage={this.createPackage}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PackageContainer;