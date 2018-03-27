import React, { Component } from "react";
import AliasInput from "./AliasInput";

class SourcePull extends Component {
    constructor() {
        super();

        this.state = {
            alias: "",
            forcePull: false,
            OtherOrg: false
        };

        this.handleForcePullChange = this.handleForcePullChange.bind(this);
        this.handleOtherOrgChange = this.handleOtherOrgChange.bind(this);
        this.changeAlias = this.changeAlias.bind(this);
        this.handlePullSource = this.handlePullSource.bind(this);
    }

    changeAlias(alias) {
        this.setState({alias: alias});
    }

    handleOtherOrgChange(event) {
        this.setState({OtherOrg: !this.state.OtherOrg});
    }

    handleForcePullChange(event) {
        this.setState({forcePull: !this.state.forcePull});
    }

    handlePullSource() {
        this.props.pullChanges(this.state.forcePull, this.state.OtherOrg, this.state.alias);
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Pull Changes</strong>
                </div>
                <div className="card-body">
                    <div className="row from-group">
                        <div className="checkbox form-check">
                            <input type="checkbox" defaultChecked={this.state.forcePull} 
                                onChange={this.handleForcePullChange}
                                className="form-check-input form-check-input"/>
                            <label className="form-check-label form-check-label">Is it a force pull?</label>
                        </div>
                    </div>
                    <div className="row from-group">
                        <div className="checkbox form-check">
                            <input type="checkbox" defaultChecked={this.state.OtherOrg} 
                                onChange={this.handleOtherOrgChange}
                                className="form-check-input form-check-input"/>
                            <label className="form-check-label form-check-label">Pull from a non-default org?</label>
                        </div>
                    </div>
                    {this.state.OtherOrg? <AliasInput alias={this.state.alias} changeAlias={this.changeAlias}/>: null}
                    <button type="button" className="btn btn-primary form-button" 
					    onClick={this.handlePullSource}>Pull Changes</button>
                </div>
            </div>
        );
    }
    
}

export default SourcePull;