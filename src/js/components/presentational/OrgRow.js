import React, { Component } from "react";

class OrgRow extends Component {
	constructor() {
		super();
		this.handleShowDetail = this.handleShowDetail.bind(this);
	}

	handleShowDetail() {
		this.props.setDetailOrg(this.props.org);
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
					<a href="#">Open Org</a>
				</div>
			</div>
		);
	} 
} 


export default OrgRow;