import React, { Component } from "react";
import Package2VersionRow from "./Package2VersionRow";
import Pagination from "./Pagination";

class Package2VersionList extends Component {
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
		let filteredSource = this.props.versionList;
		if(this.state.searchValue !== "") {
			filteredSource = [];
			for(let i = 0; i < this.props.versionList.length; i++) {
                let versionname = this.props.versionList[i].Name.toLowerCase();
                let versionNumber = this.props.versionList[i].Version;
				let searchValue = this.state.searchValue.toLocaleLowerCase();
				if(versionname.includes(searchValue) || versionNumber.includes(searchValue)) {
					filteredSource.push(this.props.versionList[i]);
				}
			}
		}
		const numberPerPage = 10;
		let maxCount = Math.ceil(filteredSource.length / numberPerPage);
		let indexOfLastItem = this.state.currentPage * numberPerPage;
		let indexOfFirstItem = indexOfLastItem - numberPerPage;
		let currentRecords = filteredSource.slice(indexOfFirstItem, indexOfLastItem);

		let package2VersionRows = currentRecords.map(package2Version=><Package2VersionRow key={package2Version.Id} curVersion={package2Version}/>);

		return (
            <div className="card mb-4">
                <div className="card-body">
                    <div className="card-title row">
                        <h3 className="col-sm-6">Package2 Version List</h3>
                        <div className="col-sm-6">
                            <input type="text" className="form-control input-md" placeholder="Search" value={this.state.searchValue} 
                                onChange={this.handleSearchValueChange}/>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Id</th>
                                    <th>Subscriber Package2 Version Id</th>
                                    <th>Version</th>
                                    <th>Package2 Name</th>
                                    <th>Package2 Id</th>
                                </tr>
                            </thead>
                            <tbody>
                                {package2VersionRows}
                            </tbody>
                        </table>
                    </div>
                    <Pagination currentPage={this.state.currentPage} pageClick={this.pageClick} maxCount={maxCount}/>
                    <button type="button" className="btn btn-primary" 
						onClick={this.props.handleRefreshVersions}>Refresh Package Version List</button>
                </div>
            </div>
		);
	}
}

export default Package2VersionList;