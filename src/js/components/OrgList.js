import React, { Component } from "react";
import OrgRow from "./OrgRow";

function OrgList(props) {
	const orgRows = props.orgs.map(org=><OrgRow key={org.username} org={org}/>);
	return (
		<div className="section-group">
			<div className="row">
				<h3>{props.title}</h3>
			</div>
			{orgRows}
		</div>
	);
}

export default OrgList;