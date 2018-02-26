import React, { Component } from "react";
import OrgList from "../presentational/OrgList";
import OrgDetails from "../presentational/OrgDetails";
import axios from 'axios';

class OrgContainer extends Component {
	constructor() {
		super();
		this.state = {
			scratchOrgs: [],
			nonScratchOrgs: [],
			detailOrg: {},
			showDetailOrg: false
		};
	}

	handleRefreshOrgs(e) {
		axios.get("/api/org").then((res) => {
			if(res.status === 200) {
				let result = res.data.result;
	            this.setState({
		        	scratchOrgs: result.scratchOrgs,
		        	nonScratchOrgs: result.nonScratchOrgs
		        })
	        } else {
	        	console.log("Error: " + res.data.err);
	        }
		});
	}

	setDetailOrg(org) {
		this.setState({
			detailOrg: org,
			showDetailOrg: true
		});
	}

	render() {
		return (
			<div>
				<OrgList orgs={this.state.nonScratchOrgs} title="Non Scratch Orgs" 
				setDetailOrg={this.setDetailOrg.bind(this)}/>
				<OrgList orgs={this.state.scratchOrgs} title="Scratch Orgs"
				setDetailOrg={this.setDetailOrg.bind(this)}/>
				<button id="orgInfo" type="button" className="btn btn-primary" onClick={this.handleRefreshOrgs.bind(this)}>Get Org List</button>
				{this.state.showDetailOrg ? <OrgDetails org={this.state.detailOrg}/> : null}
			</div>
		)
	}
}

export default OrgContainer;