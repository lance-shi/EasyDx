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
                <div className="card-body">
                    <h3 className="card-title">Create a new Project</h3>
                    <h6 className="card-subtitle mb-2 text-muted">Create a new Salesforce DX project</h6>
                    <ul className="mt-2 pl-0">
                        <li className="todo-list-item">
                            <div className="form-check">
                                <input type="checkbox" defaultChecked={this.state.isDefault} 
                                    onChange={this.handleDefaultChange}/>
                                <label>Is it default project?</label>
                            </div>
                        </li>
                        <li className="todo-list-item">
                            <label>Please specify the project's directory</label>
                            <input type="text" className="form-control" value={this.state.directory} 
                                onChange={this.handleDirectoryChange}/>
                        </li>
                    </ul>
                    <div className="card-footer todo-list-footer">
                        <div className="input-group">
                            <input type="text" className="form-control input-md" placeholder="Alias" value={this.state.alias} 
                                onChange={this.handleAliasChange}/>
                            <span className="input-group-btn">
                                <button type="button" className="btn btn-primary btn-md" onClick={this.handleCreateProject}>
                                    Create a new Project
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