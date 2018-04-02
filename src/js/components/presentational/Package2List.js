import React, { Component } from "react";
import Package2Row from "./Package2Row";

class Package2List extends Component {
    constructor() {
        super();
    }

    render() {
        const packageRows = this.props.packageList.map(curPackage=><Package2Row key={curPackage.Id} curPackage={curPackage} 
			/>);
        return (
            <div className="card mb-4">
                <div className="card-header">
					<strong>Package List</strong>
				</div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Id</th>
                                    <th>Type</th>
                                    <th>Subscriber Package Id</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {packageRows}
                            </tbody>
                        </table>
                    </div>
                    <button type="button" className="btn btn-primary" 
						onClick={this.props.handleRefreshPackages}>Refresh Package List</button>
                </div>
            </div>
        );
    }
}

export default Package2List;