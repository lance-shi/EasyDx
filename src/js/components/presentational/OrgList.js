import React, { Component } from "react";
import OrgRow from "./OrgRow";

function OrgList(props) {
	const orgRows = props.orgs.map(org=><OrgRow key={org.orgId} org={org} 
		setDetailOrg={props.setDetailOrg} 
		toggleLoadingImage={props.toggleLoadingImage}
		showAlertMessage={props.showAlertMessage}
		setDefaultOrg={props.setDefaultOrg}/>);
	return (
		<div className="section-group">
			<div className="row">
				<h3>{props.title}</h3>
			</div>
			<div className="row">
				<table className="table table-hover">
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
		</div>
	);
}

export default OrgList;