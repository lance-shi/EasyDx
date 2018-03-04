import React, { Component } from "react";
import axios from "axios";

class OrgRow extends Component {
	constructor(props) {
		super(props);
		this.handleShowDetail = this.handleShowDetail.bind(this);
		this.handleOpenOrg = this.handleOpenOrg.bind(this);
		this.handleDefaultOrg = this.handleDefaultOrg.bind(this);

		this.state = {
			defaultMarker: this.props.org.defaultMarker
		}
	}

	handleShowDetail() {
		this.props.setDetailOrg(this.props.org);
	}

	handleOpenOrg() {
		this.props.toggleLoadingImage(true);
		axios.post("/api/org", {
			username: this.props.org.username	
		}).then((res) => {
			if(res.status === 200) {
				this.props.toggleLoadingImage(false);
				this.props.showAlertMessage("success", 'Org opened successfully');
			} else {
				this.props.toggleLoadingImage(false);
				this.props.showAlertMessage("danger", "Error:" + res.data.err);
			}
	    });
	}

	handleDefaultOrg() {
		this.props.toggleLoadingImage(true);
		axios.post("api/defaultOrg", {
			username: this.props.org.username
		}).then((res) => {
			if(res.status === 200) {
				this.props.toggleLoadingImage(false);
				console.log("Default org set successfully");
				this.setState({
					defaultMarker: "(U)"
				});
			} else {
				this.props.toggleLoadingImage(false);
				console.log("Error: " + res.data.err);
			}
		});
	}

	render() {
		return (
			<tr>
				<td>{this.state.defaultMarker}</td>
				<td>{this.props.org.username}</td>
				<td>{this.props.org.alias}</td>
				<td >
					<div className="btn-group">
						<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
							Action
						</button>
						<div className="dropdown-menu">
							<a className="dropdown-item" href="#" onClick={this.handleShowDetail}>Show Details</a>
							<a className="dropdown-item" href="#" onClick={this.handleOpenOrg}>Open Org</a>
							<a className="dropdown-item" href="#" onClick={this.handleDefaultOrg}>Set as Default Org</a>
						</div>
					</div>
				</td>
			</tr>
		);
	} 
} 


export default OrgRow;