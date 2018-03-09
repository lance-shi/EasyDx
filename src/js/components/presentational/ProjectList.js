import React, { Component } from "react";
import ProjectRow from "./ProjectRow";

function ProjectList(props) {
	const projectRows = props.projects.map(project=><ProjectRow key={project.directory} project={project}
        setDefaultProj={props.setDefaultProj}
		removeProject={props.removeProject}/>);
	return (
		<div className="section-group">
			<div className="row">
				<h3>Existing Projects</h3>
			</div>
			<div className="row">
				<table className="table table-hover">
					<thead>
						<tr>
							<th style={{width: "8%"}}>Default</th>
							<th style={{width: "23%"}}>Alias</th>
							<th style={{width: "54%"}}>Directory</th>
							<th style={{width: "15%"}}>Actions</th>
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