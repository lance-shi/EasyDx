import React, { Component } from "react";
import SourceRow from "./SourceRow";
import Pagination from "./Pagination";

class SourceList extends Component {
	constructor() {
		super();
		this.state = {
			currentPage: 1,
			searchValue: ""
		}

		this.pageClick = this.pageClick.bind(this);
		this.handleSearchValueChange = this.handleSearchValueChange.bind(this);
	}

	pageClick(number) {
		this.setState({
			currentPage: number
		});
	}

	handleSearchValueChange(event) {
		this.setState({
			searchValue: event.target.value,
			currentPage: 1
		});
	}

	render() {
		let filteredSource = this.props.sources;
		if(this.state.searchValue !== "") {
			filteredSource = [];
			for(let i = 0; i < this.props.sources.length; i++) {
				let fullName = this.props.sources[i].fullName.toLowerCase();
				let searchValue = this.state.searchValue.toLocaleLowerCase();
				if(fullName.includes(searchValue)) {
					filteredSource.push(this.props.sources[i]);
				}
			}
		}
		const numberPerPage = 10;
		let maxCount = Math.ceil(filteredSource.length / numberPerPage);
		let indexOfLastItem = this.state.currentPage * numberPerPage;
		let indexOfFirstItem = indexOfLastItem - numberPerPage;
		let currentRecords = filteredSource.slice(indexOfFirstItem, indexOfLastItem);

		let sourceRows = currentRecords.map(source=><SourceRow key={this.props.title+source.fullName+source.filePath} source={source}/>);

		return (
			<div className="section-group">
				<div className="card-title row">
					<h3 className="col-sm-6">{this.props.title}</h3>
					<div className="col-sm-6">
						<input type="text" className="form-control input-md" placeholder="Search" value={this.state.searchValue} 
                            onChange={this.handleSearchValueChange}/>
					</div>
				</div>
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