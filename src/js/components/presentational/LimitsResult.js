import React, { Component } from "react";
import LimitsResultRow from "./LimitsResultRow";

class LimitsResult extends Component {
    render() {
        let limitsResultRows = this.props.limitsList.map(limitResult=><LimitsResultRow 
            key={limitResult.name} 
            limitResult={limitResult}/>);
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Org Limits</strong>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Max</th>
                                <th>Remaining</th>
                            </tr>
                        </thead>
                        <tbody>
                            {limitsResultRows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default LimitsResult;