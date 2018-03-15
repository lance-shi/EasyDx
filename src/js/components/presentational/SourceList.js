import React, { Component } from "react";
import SourceRow from "./SourceRow";
import Pagination from "./Pagination";

class SourceList extends React.Component {
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
		const sourceRows = props.sources.map(source=><SourceRow key={props.title+source.filePath} source={source}/>);
		const maxCount = 1;
		return (
			<div className="section-group">
				<h3 className="card-title">{props.title}</h3>
				<div className="table-responsive">
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
				<Pagination currentPage={this.state.currentPage} pageClick={this.pageClick} maxCount={maxCount}/>
			</div>
		);
	}
}

export default SourceList;