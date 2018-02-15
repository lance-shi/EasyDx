import React, { Component } from "react";
import $ from "jquery";
import OrgList from "./OrgList";
import axios from 'axios';

class OrgContainer extends Component {
	constructor() {
		super();
		this.state = {
			scratchOrgs: [],
			nonScratchOrgs: []
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

	render() {
		return (
			<div>
				<OrgList orgs={this.state.nonScratchOrgs} title="Non Scratch Orgs"></OrgList>
				<OrgList orgs={this.state.scratchOrgs} title="Scratch Orgs"></OrgList>
				<button id="orgInfo" type="button" onClick={this.handleRefreshOrgs.bind(this)}>Get Org List</button>
			</div>
		)
	}
}

export default OrgContainer;