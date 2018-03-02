import React, { Component } from "react";
import ProjectRow from "./ProjectRow";

function ProjectList(props) {
	const projectRows = props.projects.map(project=><ProjectRow key={project.directory} project={project}
        setDefaultProj={props.setDefaultProj}/>);
	return (
		<div className="section-group">
			<div className="row">
				<h3>Existing Projects</h3>
			</div>
			<div className="row">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>Default</th>
							<th>Alias</th>
							<th>Directory</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{projectRows}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ProjectList;