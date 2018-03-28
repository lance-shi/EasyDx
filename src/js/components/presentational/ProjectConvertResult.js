import React, { Component } from "react";
import ProjectConvertResultRow from "./ProjectConvertResultRow";
import Pagination from "./Pagination";

class ProjectConvertResult extends Component {
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
        let filteredSource = this.props.convertResults;
		if(this.state.searchValue !== "") {
			filteredSource = [];
			for(let i = 0; i < this.props.convertResults.length; i++) {
				let fullName = this.props.convertResults[i].fullName.toLowerCase();
				let searchValue = this.state.searchValue.toLocaleLowerCase();
				if(fullName.includes(searchValue)) {
					filteredSource.push(this.props.convertResults[i]);
				}
			}
		}
        const numberPerPage = 10;
		let maxCount = Math.ceil(filteredSource.length / numberPerPage);
		let indexOfLastItem = this.state.currentPage * numberPerPage;
		let indexOfFirstItem = indexOfLastItem - numberPerPage;
		let currentRecords = filteredSource.slice(indexOfFirstItem, indexOfLastItem);

        let convertResultRows = currentRecords.map(convertResult=><ProjectConvertResultRow 
            key={this.props.title+convertResult.filePath} 
            convertResult={convertResult}/>);
        return (
            <div className="card mb-4">
                <div className="card-body">
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
                                    <th>Full Name</th>
                                    <th>Type</th>
                                    <th>File Path</th>
                                </tr>
                            </thead>
                            <tbody>
                                {convertResultRows}
                            </tbody>
                        </table>
                    </div>
                    <Pagination currentPage={this.state.currentPage} pageClick={this.pageClick} maxCount={maxCount}/>
                </div>
            </div>
        );
    }
}

export default ProjectConvertResult;