import React, { Component } from "react";
import axios from 'axios';

import LoadingImage from "../presentational/LoadingImage";
import AlertMessage from "../presentational/AlertMessage";
import CurrentProjectLine from "../presentational/CurrentProjectLine";
import CurrentProjectNotExist from "../presentational/CurrentProjectNotExist";
import PageHeader from "../presentational/PageHeader";
import UserList from "../presentational/UserList";

class UserContainer extends Component {
	constructor() {
		super();
		this.state = {
			currentProject: {},
			defaultProjectExists: false,
			showLoaidngImage: false,
			showAlertMessage: false,
			alertClass: "info",
            alertMessage: "",
            users: []
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
        this.setDetailUser = this.setDetailUser.bind(this);
        this.refreshUserList = this.refreshUserList.bind(this);
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

    setDetailUser(user) {

    }

    refreshUserList() {

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
                            <UserList users={this.state.users} 
                                setDetailUser={this.setDetailUser}
                                refreshUserList={this.refreshUserList}/>
						</div>
						<div className="col-md-12 col-lg-4">
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default UserContainer;