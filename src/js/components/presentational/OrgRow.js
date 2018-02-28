import React, { Component } from "react";
import axios from "axios";

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
			<tr>
				<td></td>
				<td>{this.props.org.username}</td>
				<td>{this.props.org.alias}</td>
				<td >
					<div className="btn-group">
						<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
							Action
						</button>
						<div className="dropdown-menu">
							<a class="dropdown-item" href="#" onClick={this.handleShowDetail}>Show Details</a>
							<a class="dropdown-item" href="#" onClick={this.handleOpenOrg}>Open Org</a>
							<a class="dropdown-item" href="#" onClick={this.handleDefaultOrg}>Set as Default Org</a>
						</div>
					</div>
				</td>
			</tr>
		);
	} 
} 


export default OrgRow;