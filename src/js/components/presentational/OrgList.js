import React, { Component } from "react";
import OrgRow from "./OrgRow";

function OrgList(props) {
	const orgRows = props.orgs.map(org=><OrgRow key={org.orgId} org={org} 
		setDetailOrg={props.setDetailOrg}/>);
	return (
		<div className="section-group">
			<div className="row">
				<h3>{props.title}</h3>
			</div>
			<div className="row title-row">
				<div className="col-sm-1">Default</div>
				<div className="col-sm-4">User Name</div>
				<div className="col-sm-3">Alias</div>
				<div className="col-sm-3">Action</div>
			</div>
			{orgRows}
		</div>
	);
}

export default OrgList;