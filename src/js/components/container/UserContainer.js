import React, { Component } from "react";
import axios from 'axios';

import LoadingImage from "../presentational/LoadingImage";
import AlertMessage from "../presentational/AlertMessage";
import CurrentOrgLine from "../presentational/CurrentOrgLine";
import CurrentOrgNotExist from "../presentational/CurrentOrgNotExist";
import PageHeader from "../presentational/PageHeader";
import UserList from "../presentational/UserList";
import UserRefresh from "../presentational/UserRefresh";

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
			currentOrg: {}
		};

		axios.get("/api/org").then((res) => {
			let { nonScratchOrgs, scratchOrgs } = res.data.orgs;
            for(let i = 0; i < nonScratchOrgs.length; i++) {
				if(nonScratchOrgs[i].defaultMarker === "(U)") {
					this.setState({
						currentOrg: nonScratchOrgs[i],
						defaultOrgExists: true
					});
					break;
				}
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
				this.showAlertMessage("success", "Org list refreshed successfully!");
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
				<PageHeader title="Create"/>
				{this.state.showAlertMessage ? <AlertMessage 
					alertClass={this.state.alertClass}
					message={this.state.alertMessage}/> : null}
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-12 col-lg-8">
							{this.state.defaultOrgExists ? <CurrentOrgLine 
								org={this.state.currentOrg}/> : <CurrentOrgNotExist/>}
                            <UserList users={this.state.users} 
                                setDetailUser={this.setDetailUser}/>
						</div>
						<div className="col-md-12 col-lg-4">
							<UserRefresh refreshUserList={this.refreshUserList}
								defaultOrgExist={this.state.defaultOrgExists}
								currentOrg={this.state.currentOrg}
								showAlertMessage={this.showAlertMessage}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default UserContainer;