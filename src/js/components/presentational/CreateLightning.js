import React, { Component } from "react";

class CreateLightning extends Component {
    constructor() {
        super();
        this.state = {
            methodName: "Lightning App",
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
                    <strong>Create Lightning Components</strong>
                </div>
                <div className="card-body">
                    <div className="row form-group input-bar">
                        <label>
                            Select what you want to create
                        </label>
                        <select className="form-control" value={this.state.methodName} onChange={this.handleChangeMethod}>
                            <option value="LightningApp">Lightning App</option>
                            <option value="LightningComponent">Lightning Component</option>
                            <option value="LightningEvent">Lightning Event</option>
                            <option value="LightningInterface">Lightning Interface</option>
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

export default CreateLightning;