import React, { Component } from "react";
import axios from 'axios';

import LoadingImage from "../presentational/LoadingImage";
import AlertMessage from "../presentational/AlertMessage";
import CurrentProjectLine from "../presentational/CurrentProjectLine";
import CurrentProjectNotExist from "../presentational/CurrentProjectNotExist";
import PageHeader from "../presentational/PageHeader";
import Package2Create from "../presentational/Package2Create";
import Package2List from "../presentational/Package2List";
import Package2VersionList from "../presentational/Package2VersionList";

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
			packageList: [],
			versionList: []
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
		this.handleRefreshVersions = this.handleRefreshVersions.bind(this);
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
            directory: this.state.currentProject.directory
        }).then((res) => {
            if(res.status === 200) {
				let result = res.data.result;
				let curPackage = {
					Id: result.Id,
					SubscriberPackageId: result.SubscriberPackageId,
					Name: packageName,
					Description: description,
					ContainerOptions: packageType
				};
                this.state.packageList.push(curPackage);
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
		if(!this.state.defaultProjectExists) {
            this.showAlertMessage("danger", "Error: Please specify a default project first");
            return;
        }
        this.toggleLoadingImage(true);
        axios.post("/api/listPackage2", {
            directory: this.state.currentProject.directory
        }).then((res) => {
            if(res.status === 200) {
				let result = res.data.result;
                this.setState({
					packageList: result,
                    showLoaidngImage: false
                });
                this.showAlertMessage("success", "Package list refreshed successfully!");
            } else {
                this.toggleLoadingImage(false);
                this.showAlertMessage("danger", "Error:" + res.data.err);
            }
        });
	}
	
	handleRefreshVersions() {
		if(!this.state.defaultProjectExists) {
            this.showAlertMessage("danger", "Error: Please specify a default project first");
            return;
        }
        this.toggleLoadingImage(true);
        axios.post("/api/listPackage2Version", {
            directory: this.state.currentProject.directory
        }).then((res) => {
            if(res.status === 200) {
				let result = res.data.result;
                this.setState({
					versionList: result,
                    showLoaidngImage: false
                });
                this.showAlertMessage("success", "Package list refreshed successfully!");
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
				<PageHeader title="Package"/>
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
							<Package2VersionList versionList={this.state.versionList}
                                handleRefreshVersions={this.handleRefreshVersions}/>
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