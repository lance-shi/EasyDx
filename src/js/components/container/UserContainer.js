import React, { Component } from "react";
import axios from 'axios';

import LoadingImage from "../presentational/LoadingImage";
import AlertMessage from "../presentational/AlertMessage";
import CurrentOrgLine from "../presentational/CurrentOrgLine";
import CurrentOrgNotExist from "../presentational/CurrentOrgNotExist";
import PageHeader from "../presentational/PageHeader";
import UserList from "../presentational/UserList";
import UserRefresh from "../presentational/UserRefresh";
import UserDetail from "../presentational/UserDetail";
import UserCreate from "../presentational/UserCreate";
import UserAssignPerm from "../presentational/UserAssignPerm";

class UserContainer extends Component {
	constructor() {
		super();
		this.state = {
			showLoaidngImage: false,
			showAlertMessage: false,
			alertClass: "info",
            alertMessage: "",
			users: [],
			defaultOrgExists: false,
			currentOrg: {},
			currentUser: {},
			showDetailUser: false
		};

		axios.get("/api/org").then((res) => {
			let { nonScratchOrgs, scratchOrgs } = res.data.orgs;
            for(let i = 0; i < scratchOrgs.length; i++) {
				if(scratchOrgs[i].defaultMarker === "(U)") {
					this.setState({
						currentOrg: scratchOrgs[i],
						defaultOrgExists: true
					});
					break;
				}
			}
		});

		this.toggleLoadingImage = this.toggleLoadingImage.bind(this);
		this.showAlertMessage = this.showAlertMessage.bind(this);
        this.hideAlertMessage = this.hideAlertMessage.bind(this);
        this.setDetailUser = this.setDetailUser.bind(this);
		this.refreshUserList = this.refreshUserList.bind(this);
		this.createUser = this.createUser.bind(this);
		this.generatePassword = this.generatePassword.bind(this);
		this.assignPermission = this.assignPermission.bind(this);
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
		this.setState({
			currentUser: user,
			showDetailUser: true
		});
	}
	
	createUser(org) {
		this.setState({showLoaidngImage: true});
		axios.post("/api/createUser", {
            org: org
        }).then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
	            this.toggleLoadingImage(false);
				this.showAlertMessage("success", "New user created successfully!");
	        } else {
				this.toggleLoadingImage(false);
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
	}

	generatePassword(user) {
		this.setState({showLoaidngImage: true});
		axios.post("/api/generatePassword", {
            userName: user.username
        }).then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
	            this.toggleLoadingImage(false);
				this.showAlertMessage("success", `Successfully set the password "${result.password}" for user!`);
	        } else {
				this.toggleLoadingImage(false);
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
	}

    refreshUserList(org) {
		this.setState({showLoaidngImage: true});
		axios.post("/api/user", {
            org: org
        }).then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
	            this.setState({
					showLoaidngImage: false,
		        	users: result
				});
				this.showAlertMessage("success", "User list refreshed successfully!");
	        } else {
				this.toggleLoadingImage(false);
	        	this.showAlertMessage("danger", "Error:" + res.data.err);
	        }
		});
	}

	assignPermission(userName, permissionName) {
		this.toggleLoadingImage(true);
		axios.post("/api/assignPermission", {
			userName: userName,
			permissionSet: permissionName
		}).then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
	            this.toggleLoadingImage(false);
				this.showAlertMessage("success", "User permission assigned successfully!");
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
				<PageHeader title="User"/>
				{this.state.showAlertMessage ? <AlertMessage 
					alertClass={this.state.alertClass}
					message={this.state.alertMessage}/> : null}
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 col-lg-8">
							{this.state.defaultOrgExists ? <CurrentOrgLine 
								org={this.state.currentOrg}/> : <CurrentOrgNotExist/>}
                            <UserList users={this.state.users} 
                                setDetailUser={this.setDetailUser}
								generatePassword={this.generatePassword}/>
						</div>
						<div className="col-md-12 col-lg-4">
							<UserRefresh refreshUserList={this.refreshUserList}
								defaultOrgExist={this.state.defaultOrgExists}
								currentOrg={this.state.currentOrg}
								showAlertMessage={this.showAlertMessage}/>
							<UserCreate createUser={this.createUser}
								defaultOrgExist={this.state.defaultOrgExists}
								currentOrg={this.state.currentOrg}
								showAlertMessage={this.showAlertMessage}/>
							<UserAssignPerm assignPermission={this.assignPermission}/>
							{this.state.showDetailUser ? <UserDetail user={this.state.currentUser}/> : null}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default UserContainer;