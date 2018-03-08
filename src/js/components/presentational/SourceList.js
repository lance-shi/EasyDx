import React, { Component } from "react";
import SourceRow from "./SourceRow";

function SourceList(props) {
	const sourceRows = props.sources.map(source=><SourceRow key={props.title+source.filePath} source={source}/>);
	return (
		<div className="section-group">
			<div className="row">
				<h3>{props.title}</h3>
			</div>
			<div className="row">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>State</th>
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
		</div>
	);
}

export default SourceList;