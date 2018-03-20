import React, { Component } from "react";
import AliasInput from "./AliasInput";

class LimitsRetrieve extends Component {
    constructor() {
        super();

        this.state = {
            alias: "",
            OtherOrg: false
        };

        this.handleOtherOrgChange = this.handleOtherOrgChange.bind(this);
        this.changeAlias = this.changeAlias.bind(this);
        this.handleRetrieveLimits = this.handleRetrieveLimits.bind(this);
    }

    changeAlias(alias) {
        this.setState({alias: alias});
    }

    handleOtherOrgChange(event) {
        this.setState({OtherOrg: !this.state.OtherOrg});
    }

    handleRetrieveLimits() {
        this.props.retrieveLimits(this.state.OtherOrg, this.state.alias);
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Retrieve Limits</strong>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Display remaining and maximum calls and events for your org</h6>
                    <div className="row from-group">
                        <div className="checkbox form-check">
                            <input type="checkbox" defaultChecked={this.state.OtherOrg} 
                                onChange={this.handleOtherOrgChange}
                                className="form-check-input form-check-input"/>
                            <label className="form-check-label form-check-label">Display limits of a non-default org?</label>
                        </div>
                    </div>
                    {this.state.OtherOrg? <AliasInput alias={this.state.alias} changeAlias={this.changeAlias}/>: null}
                    <button type="button" className="btn btn-primary form-button" 
					    onClick={this.handleRetrieveLimits}>Retrieve Limits</button>
                </div>
            </div>
        );
    }
    
}

export default LimitsRetrieve;