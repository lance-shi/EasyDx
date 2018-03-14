import React, { Component } from "react";
import AliasInput from "./AliasInput";

class SourceRetrieve extends Component {
    constructor() {
        super();

        this.state = {
            alias: "",
            packageName: "",
            OtherOrg: false
        };

        this.handleOtherOrgChange = this.handleOtherOrgChange.bind(this);
        this.changeAlias = this.changeAlias.bind(this);
        this.handleRetrieveMetadata = this.handleRetrieveMetadata.bind(this);
        this.handlePackageChange = this.handlePackageChange.bind(this);
    }

    changeAlias(alias) {
        this.setState({alias: alias});
    }

    handleOtherOrgChange(event) {
        this.setState({OtherOrg: !this.state.OtherOrg});
    }

    handlePackageChange(event) {
        this.setState({packageName: event.target.value});
    }

    handleRetrieveMetadata() {
        this.props.retrieveMetadata(this.state.OtherOrg, this.state.alias, this.state.packageName);
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-body">
                    <h3 className="card-title">Retrieve Metadata</h3>
                    <h6 className="card-subtitle mb-2 text-muted">Retrieve a .zip file from target Org's package</h6>
                    <ul className="mt-2 pl-0">
                        <li className="todo-list-item">
                            <div className="form-check">
                                <input type="checkbox" defaultChecked={this.state.OtherOrg} 
                                    onChange={this.handleOtherOrgChange}/>
                                <label>Retrieve from a non-default org?</label>
                            </div>
                        </li>
                        {this.state.OtherOrg? <AliasInput alias={this.state.alias} changeAlias={this.changeAlias}/>: null}
                        <li className="todo-list-item">
                            <label>Please specify the package's name</label>
                            <input type="text" className="form-control" value={this.state.packageName} 
                                onChange={this.handlePackageChange}/>
                        </li>
                    </ul>
                    <button type="button" className="btn btn-primary" 
					    onClick={this.handleRetrieveMetadata}>Retrieve metadata</button>
                </div>
            </div>
        );
    }
    
}

export default SourceRetrieve;