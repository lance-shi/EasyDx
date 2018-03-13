import React, { Component } from "react";

function SourcePushResultList(props) {
	const sourceRows = props.sources.map(source=><SourceRow key={props.title+source.filePath} source={source}/>);
	return (
		<div className="section-group">
			<h3 className="card-title">{props.title}</h3>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>State</th>
						<th>Operation</th>
						<th>Full Name</th>
						<th>Type</th>
						<th>File Path</th>
					</tr>
				</thead>
				<tbody>
					{sourceRows}
				</tbody>
			</table>
		</div>
	);
}

export default SourcePushResultList;