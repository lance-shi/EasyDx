import React, { Component } from "react";
import axios from 'axios';

class OrgRow extends Component {
	constructor() {
		super();
		this.handleShowDetail = this.handleShowDetail.bind(this);
		this.handleOpenOrg = this.handleOpenOrg.bind(this);
		this.handleDefaultOrg = this.handleDefaultOrg.bind(this);
	}

	handleShowDetail() {
		this.props.setDetailOrg(this.props.org);
	}

	handleOpenOrg() {
		axios.post("/api/org", {
			username: this.props.org.username	
		}).then((res) => {
			if(res.status === 200) {
				console.log('Org opened successfully');
			} else {
				console.log("Error: " + res.data.err);
			}
	    });
	}

	handleDefaultOrg() {
		
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-3">{this.props.org.alias}</div>
				<div className="col-sm-2">
					<a href="#" onClick={this.handleShowDetail}>Show Details</a>
				</div>
				<div className="col-sm-2">
					<a href="#" onClick={this.handleOpenOrg}>Open Org</a>
				</div>
				<div className="col-sm-2">
					<a href="#" onClick={this.handleDefaultOrg}>Set as Default Org</a>
				</div>
			</div>
		);
	} 
} 


export default OrgRow;