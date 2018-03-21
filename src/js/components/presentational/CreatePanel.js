import React, { Component } from "react";

class CreatePanel extends Component {
    constructor() {
        super();
        this.state = {
            methodName: "ApexClass",
            componentName: ""
        };
        this.handleChangeMethod = this.handleChangeMethod.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleComponentNameChange = this.handleComponentNameChange.bind(this);
    }

    handleChangeMethod(event) {
        this.setState({methodName: event.target.value});
    }

    handleCreate() {
        this.props.createMethod(this.state.methodName, this.state.componentName);
    }

    handleComponentNameChange(event) {
        this.setState({componentName: event.target.value});
    }

    render() {
        return(
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Create Apex and Visualforce</strong>
                </div>
                <div className="card-body">
                    <div className="row form-group input-bar">
                        <label>
                            Select what you want to create
                        </label>
                        <select className="form-control" value={this.state.methodName} onChange={this.handleChangeMethod}>
                            <option value="ApexClass">Apex Class</option>
                            <option value="ApexTrigger">Apex Trigger</option>
                            <option value="VisualforcePage">Visualforce Page</option>
                            <option value="VisualforceComponent">Visualforce Component</option>
                        </select>
                    </div>
                    <div className="row from-group input-bar">
                        <label>Please specify the {this.state.methodName} name</label>
                        <input type="text" className="form-control" value={this.props.alias} 
                            onChange={this.handleComponentNameChange}/>
                    </div>
                    <button type="button" className="btn btn-primary form-button" 
					    onClick={this.handleCreate}>Create</button>
                </div>
            </div>
        );
    }
}

export default CreatePanel;