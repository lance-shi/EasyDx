import React, { Component } from "react";
import $ from "jquery";
import OrgList from "../presentational/OrgList";
import OrgDetails from "../presentational/OrgDetails";
import axios from 'axios';

class OrgContainer extends Component {
	constructor() {
		super();
		this.state = {
			scratchOrgs: [],
			nonScratchOrgs: [],
			detailOrg: {}
		};
	}

	handleRefreshOrgs(e) {
		axios.get("/api/org").then((res) => {
			let result = JSON.parse(res.data[0]).result;
            this.setState({
	        	scratchOrgs: result.scratchOrgs,
	        	nonScratchOrgs: result.nonScratchOrgs
	        })
		});
	}

	setDetailOrg(org) {
		this.setState({detailOrg: org});
	}

	render() {
		return (
			<div>
				<OrgList orgs={this.state.nonScratchOrgs} title="Non Scratch Orgs" 
				setDetailOrg={this.setDetailOrg.bind(this)}></OrgList>
				<OrgList orgs={this.state.scratchOrgs} title="Scratch Orgs"
				setDetailOrg={this.setDetailOrg.bind(this)}></OrgList>
				<button id="orgInfo" type="button" onClick={this.handleRefreshOrgs.bind(this)}>Get Org List</button>
				<OrgDetails org={this.state.detailOrg}></OrgDetails>
			</div>
		)
	}
}

export default OrgContainer;