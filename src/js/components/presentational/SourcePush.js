import React, { Component } from "react";

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
        this.handleAliasChange = this.handleAliasChange.bind(this);
        this.handlePushSource = this.handlePushSource.bind(this);
    }

    handleAliasChange(event) {
        this.setState({alias: event.target.value});
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
                <div className="card-body">
                    <h3 className="card-title">Connect Org</h3>
                    <h6 className="card-subtitle mb-2 text-muted">Connect to a production org or sandbox</h6>
                    <ul className="mt-2 pl-0">
                        <li className="todo-list-item">
                            <div className="form-check">
                                <input type="checkbox" defaultChecked={this.state.forcePush} 
                                    onChange={this.handleForcePushChange}/>
                                <label>Is it a force push?</label>
                            </div>
                        </li>
                        <li className="todo-list-item">
                            <div className="form-check">
                                <input type="checkbox" defaultChecked={this.state.isDevhub} 
                                    onChange={this.handleDevHubChange}/>
                                <label>Do you want to push to non-default org?</label>
                            </div>
                        </li>
                        <li className="todo-list-item">
                            <label>Please specify the org's alias</label>
                            <input type="text" className="form-control" value={this.state.alias} 
                                onChange={this.handleAliasChange}/>
                        </li>
                    </ul>
                    <button type="button" className="btn btn-primary" 
					    onClick={this.handlePushSource}>Push Changes</button>
                </div>
            </div>
        );
    }
    
}

export default SourcePush;