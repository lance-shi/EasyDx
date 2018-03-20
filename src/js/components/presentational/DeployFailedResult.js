import React, { Component } from "react";
import DeployFailedResultRow from "./DeployFailedResultRow";
import Pagination from "./Pagination";

class DeployFailedResult extends Component {
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
        const numberPerPage = 10;
		let maxCount = Math.ceil(this.props.deploymentFailures.length / numberPerPage);
		let indexOfLastItem = this.state.currentPage * numberPerPage;
		let indexOfFirstItem = indexOfLastItem - numberPerPage;
		let currentRecords = this.props.deploymentFailures.slice(indexOfFirstItem, indexOfLastItem);

        let failedResultRows = currentRecords.map(failedResult=><DeployFailedResultRow 
            key={this.props.title+failedResult.filePath} 
            failedResult={failedResult}/>);
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>{this.props.title}</strong>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Column</th>
                                    <th>Line</th>
                                    <th>Error</th>
                                    <th>Full Name</th>
                                    <th>Type</th>
                                    <th>File Path</th>
                                </tr>
                            </thead>
                            <tbody>
                                {failedResultRows}
                            </tbody>
                        </table>
                    </div>
                    <Pagination currentPage={this.state.currentPage} pageClick={this.pageClick} maxCount={maxCount}/>
                </div>
            </div>
        );
    }
}

export default DeployFailedResult;