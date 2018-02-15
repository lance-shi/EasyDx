import React, { Component } from "react";
import axios from 'axios';

class OrgRow extends Component {
	constructor() {
		super();
		this.handleShowDetail = this.handleShowDetail.bind(this);
		this.handleOpenOrg = this.handleOpenOrg.bind(this);
	}

	handleShowDetail() {
		this.props.setDetailOrg(this.props.org);
	}

	handleOpenOrg() {
		axios.post("/api/org", {
			username: this.props.org.username	
		}).then((res) => {
			console.log('Org opened successfully');
	    });
	}

	render() {
		return (
			<div className="row">
				<div className="col-sm-4">{this.props.org.username}</div>
				<div className="col-sm-3">{this.props.org.alias}</div>
				<div className="col-sm-2">
					<a href="#" onClick={this.handleShowDetail}>Show Details</a>
				</div>
				<div className="col-sm-2">
					<a href="#" onClick={this.handleOpenOrg}>Open Org</a>
				</div>
			</div>
		);
	} 
} 


export default OrgRow;