import React, { Component } from "react";
import OrgRow from "./OrgRow";
import Pagination from "./Pagination";

class OrgList extends Component {
	constructor() {
		super();

		this.state = {
			currentPage: 1,
			searchValue: ""
		}
		this.pageClick = this.pageClick.bind(this);
		this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
	}

	pageClick(number) {
		this.setState({
			currentPage: number
		});
	}

	handleSearchValueChange(event) {
		this.setState({
			searchValue: event.target.value,
			currentPage: 1
		});
	}

	render() {
		let filteredSource = this.props.orgs;
		if(this.state.searchValue !== "") {
			filteredSource = [];
			for(let i = 0; i < this.props.orgs.length; i++) {
				let username = this.props.orgs[i].username.toLowerCase();
				let defaultMarker = "";
				if(this.props.orgs[i].defaultMarker !== null && this.props.orgs[i].defaultMarker !== undefined) {
					defaultMarker = this.props.orgs[i].defaultMarker.toLowerCase();
				}
				let alias = "";
				if(this.props.orgs[i].alias !== null && this.props.orgs[i].alias !== undefined) {
					alias = this.props.orgs[i].alias.toLowerCase();
				}

				let searchValue = this.state.searchValue.toLocaleLowerCase();
				if(username.includes(searchValue) || alias.includes(searchValue) || defaultMarker.includes(searchValue)) {
					filteredSource.push(this.props.orgs[i]);
				}
			}
		}
		const numberPerPage = 5;
		let maxCount = Math.ceil(filteredSource.length / numberPerPage);
		let indexOfLastItem = this.state.currentPage * numberPerPage;
		let indexOfFirstItem = indexOfLastItem - numberPerPage;
		let currentOrgs = filteredSource.slice(indexOfFirstItem, indexOfLastItem);

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
				<div className="card-title row">
					<h3 className="col-sm-6">{this.props.title}</h3>
					<div className="col-sm-6">
						<input type="text" className="form-control input-md" placeholder="Search" value={this.state.searchValue} 
                            onChange={this.handleSearchValueChange}/>
					</div>
				</div>
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