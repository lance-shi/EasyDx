import React, { Component } from "react";
import ProjectRow from "./ProjectRow";
import Pagination from "./Pagination";

class ProjectList extends Component {
	constructor() {
		super();

		this.state = {
			currentPage: 1
		}
		this.pageClick = this.pageClick.bind(this);
	}

	pageClick(number) {
		this.setState({
			currentPage: number
		});
	}

	render() {
		const numberPerPage = 5;
		let maxCount = Math.ceil(this.props.projects.length / numberPerPage);
		let indexOfLastItem = this.state.currentPage * numberPerPage;
		let indexOfFirstItem = indexOfLastItem - numberPerPage;
		let currentProjects = this.props.projects.slice(indexOfFirstItem, indexOfLastItem);

		let projectRows = currentProjects.map(project=><ProjectRow key={project.directory} project={project}
			setDefaultProj={this.props.setDefaultProj}
			removeProject={this.props.removeProject}
			reverseConvertProject={this.props.reverseConvertProject}
			convertProject={this.props.convertProject}/>);
		return (
			<div className="card mb-4">
				<div className="card-header">
					<strong>Current Projects</strong>
				</div>
				<div className="card-body">
					<div>
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
					<Pagination currentPage={this.state.currentPage} pageClick={this.pageClick} maxCount={maxCount}/>
				</div>
			</div>
		);
	}
}

export default ProjectList;