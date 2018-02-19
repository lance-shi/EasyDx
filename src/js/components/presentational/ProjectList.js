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
			<div className="row title-row">
				<div className="col-sm-3">Alias</div>
				<div className="col-sm-6">Directory</div>
			</div>
			{projectRows}
		</div>
	);
}

export default ProjectList;