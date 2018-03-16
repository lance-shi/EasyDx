import React, { Component } from "react";
import AliasInput from "./AliasInput";

class SourcePush extends Component {
    constructor() {
        super();

        this.state = {
            alias: "",
            forcePush: false,
            OtherOrg: false
        };

        this.handleForcePushChange = this.handleForcePushChange.bind(this);
        this.handleOtherOrgChange = this.handleOtherOrgChange.bind(this);
        this.changeAlias = this.changeAlias.bind(this);
        this.handlePushSource = this.handlePushSource.bind(this);
    }

    changeAlias(alias) {
        this.setState({alias: alias});
    }

    handleOtherOrgChange(event) {
        this.setState({OtherOrg: !this.state.OtherOrg});
    }

    handleForcePushChange(event) {
        this.setState({forcePush: !this.state.forcePush});
    }

    handlePushSource() {
        this.props.pushChanges(this.state.forcePush, this.state.OtherOrg, this.state.alias);
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Push Changes</strong>
                </div>
                <div className="card-body">
                    <div className="row from-group">
                        <div className="checkbox form-check">
                            <input type="checkbox" defaultChecked={this.state.forcePush} 
                                onChange={this.handleForcePushChange}
                                className="form-check-input form-check-input"/>
                            <label className="form-check-label form-check-label">Is it a force push?</label>
                        </div>
                    </div>
                    <div className="row from-group">
                        <div className="checkbox form-check">
                            <input type="checkbox" defaultChecked={this.state.OtherOrg} 
                                onChange={this.handleOtherOrgChange}
                                className="form-check-input form-check-input"/>
                            <label className="form-check-label form-check-label">Push to a non-default org?</label>
                        </div>
                    </div>
                    {this.state.OtherOrg? <AliasInput alias={this.state.alias} changeAlias={this.changeAlias}/>: null}
                    <button type="button" className="btn btn-primary form-button" 
					    onClick={this.handlePushSource}>Push Changes</button>
                </div>
            </div>
        );
    }
    
}

export default SourcePush;