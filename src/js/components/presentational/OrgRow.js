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

	/*handleDropDownToggle() {
		if(this.state.showDropDown === "") {
			this.setState({
				showDropDown: " show"
			});
		} else {
			this.setState({
				showDropDown: ""
			});
		}
	}*/

	render() {
		return (
			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-4">{this.props.org.username}</div>
				<div className="col-sm-3">{this.props.org.alias}</div>
				<div className="col-sm-3">
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
				</div>
			</div>
		);
	} 
} 


export default OrgRow;