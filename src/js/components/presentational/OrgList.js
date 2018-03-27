import React, { Component } from "react";
import OrgRow from "./OrgRow";
import Pagination from "./Pagination";

class OrgList extends Component {
	constructor() {
		super();

		this.state = {
			currentPage: 1
		}
		this.pageClick = this.pageClick.bind(this);
	}

	pageClick(number) {
		this.setState({
			currentPage: number
		});
	}

	render() {
		const numberPerPage = 5;
		let maxCount = Math.ceil(this.props.orgs.length / numberPerPage);
		let indexOfLastItem = this.state.currentPage * numberPerPage;
		let indexOfFirstItem = indexOfLastItem - numberPerPage;
		let currentOrgs = this.props.orgs.slice(indexOfFirstItem, indexOfLastItem);

		let orgType = "nonScratch";
		if(this.props.title === "Scratch Orgs") {
			orgType = "scratch";
		}
		const orgRows = currentOrgs.map(org=><OrgRow key={org.orgId} org={org} 
			setDetailOrg={this.props.setDetailOrg} 
			toggleLoadingImage={this.props.toggleLoadingImage}
			showAlertMessage={this.props.showAlertMessage}
			setDefaultOrg={this.props.setDefaultOrg}
			setDefaultDevhub={this.props.setDefaultDevhub}
			deleteOrg={this.props.deleteOrg}
			orgType={orgType}/>);
		return (
			<div>
				<h3 className="card-title">{this.props.title}</h3>
				<div>
					<table className="table table-striped">
						<thead>
							<tr>
								<th>Default</th>
								<th>User Name</th>
								<th>Alias</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{orgRows}
						</tbody>
					</table>
				</div>
				<Pagination currentPage={this.state.currentPage} pageClick={this.pageClick} maxCount={maxCount}/>
			</div>
		);
	}
}

export default OrgList;