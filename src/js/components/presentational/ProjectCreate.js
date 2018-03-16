import React, { Component } from "react";

class ProjectCreate extends Component {
	constructor() {
        super();

        this.state = {
            alias: "",
            directory: "",
            isDefault: false
        };

        this.handleAliasChange = this.handleAliasChange.bind(this);
        this.handleDirectoryChange = this.handleDirectoryChange.bind(this);
        this.handleCreateProject = this.handleCreateProject.bind(this);
        this.handleDefaultChange = this.handleDefaultChange.bind(this);
    }

    handleAliasChange(event) {
        this.setState({alias: event.target.value});
    }

    handleDirectoryChange(event) {
        this.setState({directory: event.target.value});
    }

    handleDefaultChange(event) {
        this.setState({isDefault: !this.state.isDefault});
    }

    handleCreateProject() {
        if(this.state.alias === "") {
            this.props.showAlertMessage("danger", "Please populate the alias of the project");
            return;
        } 
        if(this.state.directory === "") {
            this.props.showAlertMessage("danger", "Please populate the directory to create the project");
            return;
        }

        let project = {
            alias: this.state.alias,
            directory: this.state.directory,
            isDefault: this.state.isDefault
        };

        this.props.createProject(project);

        this.setState({
            alias: "",
            directory: "",
            isDefault: false
        });
    }

    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">
                    <strong>Create a new Project</strong>
                </div>
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">Create a new Salesforce DX project</h6>
                    <div className="row from-group">
                        <div className="checkbox form-check">
                            <input type="checkbox" defaultChecked={this.state.isDefault} 
                                onChange={this.handleDefaultChange} 
                                className="form-check-input form-check-input"/>
                            <label className="form-check-label form-check-label">Is it default project?</label>
                        </div>
                    </div>
                    <div className="row from-group input-bar">
                        <label>Please specify the project's directory</label>
                        <input type="text" className="form-control" value={this.state.directory} 
                            onChange={this.handleDirectoryChange}/>
                    </div>
                    <div className="card-footer todo-list-footer">
                        <div className="input-group">
                            <input type="text" className="form-control input-md" placeholder="Alias" value={this.state.alias} 
                                onChange={this.handleAliasChange}/>
                            <span className="input-group-btn">
                                <button type="button" className="btn btn-primary btn-md" onClick={this.handleCreateProject}>
                                    Create Project
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectCreate;