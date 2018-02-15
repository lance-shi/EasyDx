import React from "react";

const OrgRow = (props) => (
	<div className="row">
		<div className="col-sm-2">User Name: </div>
		<div className="col-sm-4">{props.org.username}</div>
		<div className="col-sm-2">alias </div>
		<div className="col-sm-4">{props.org.alias}</div>
	</div>
);

export default OrgRow;