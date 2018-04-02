import React, { Component } from "react";

class Package2Create extends Component {
    constructor() {
        super();
        this.state = {
            packageType: "Managed",
            packageName: "",
            description: ""
        };
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleCreatePackage = this.handleCreatePackage.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePackageNameChange = this.handlePackageNameChange.bind(this);
    }

    handleChangeType(event) {
        this.setState({packageType: event.target.value});
    }

    handleCreatePackage() {
        this.props.createPackage(this.state.packageType, this.state.packageName, this.state.description);
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    handlePackageNameChange(event) {
        this.setState({packageName: event.target.value});
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
                            Select the type of package
                        </label>
                        <select className="form-control" value={this.state.packageType} onChange={this.handleChangeType}>
                            <option value="Managed">Managed</option>
                            <option value="Unlocked">Unlocked</option>
                            <option value="Locked">Locked</option>
                        </select>
                    </div>
                    <div className="row from-group input-bar">
                        <label>Please put the descirption here. </label>
                        <input type="text" className="form-control" value={this.state.description} 
                            onChange={this.handleDescriptionChange}/>
                    </div>
                    <div className="card-footer todo-list-footer">
                        <div className="input-group">
                            <input type="text" className="form-control input-md" placeholder="Name" value={this.state.packageName} 
                                onChange={this.handlePackageNameChange}/>
                            <span className="input-group-btn">
                                <button className="btn btn-primary btn-md" onClick={this.handleCreatePackage}>Create</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Package2Create;