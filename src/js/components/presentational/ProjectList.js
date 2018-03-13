import React, { Component } from "react";
import ProjectRow from "./ProjectRow";

function ProjectList(props) {
	const projectRows = props.projects.map(project=><ProjectRow key={project.directory} project={project}
        setDefaultProj={props.setDefaultProj}
		removeProject={props.removeProject}/>);
	return (
		<div className="card mb-4">
            <div className="card-body">
				<h3 className="card-title">Existing Projects</h3>
				<table className="table table-striped">
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