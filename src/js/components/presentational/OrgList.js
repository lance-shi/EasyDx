import React, { Component } from "react";
import OrgRow from "./OrgRow";

function OrgList(props) {
	const orgRows = props.orgs.map(org=><OrgRow key={org.orgId} org={org} 
		setDetailOrg={props.setDetailOrg} 
		toggleLoadingImage={props.toggleLoadingImage}
		showAlertMessage={props.showAlertMessage}
		setDefaultOrg={props.setDefaultOrg}
		setDefaultDevhub={props.setDefaultDevhub}
		deleteOrg={props.deleteOrg}/>);
	return (
		<div>
			<h3 className="card-title">{props.title}</h3>
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
	);
}

export default OrgList;