import React, { Component } from "react";

class ProjectAdd extends Component {
	constructor() {
        super();

        this.state = {
            alias: "",
            directory: "",
            isDefault: false
        };

        this.handleAliasChange = this.handleAliasChange.bind(this);
        this.handleDirectoryChange = this.handleDirectoryChange.bind(this);
        this.handleAddProject = this.handleAddProject.bind(this);
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

    handleAddProject() {
        if(this.state.alias === "") {
            this.props.showAlertMessage("danger", "Please populate the alias of the project");
            return;
        } 
        if(this.state.directory === "") {
            this.props.showAlertMessage("danger", "Please populate the directory of the project (Where you store your project in your local machine)");
            return;
        }

        let project = {
            alias: this.state.alias,
            directory: this.state.directory,
            isDefault: this.state.isDefault
        };

        this.props.addProject(project);

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
                    <h3 className="card-title">Add a Project</h3>
                    <h6 className="card-subtitle mb-2 text-muted">Connect to a production org or sandbox</h6>
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
                            <input type="text" className="form-control input-md" placeholder="Directory" value={this.state.directory} 
                                onChange={this.handleDirectoryChange}/>
                        </li>
                    </ul>
                    <div className="card-footer todo-list-footer">
                        <div className="input-group">
                            <input type="text" className="form-control input-md" placeholder="Alias" value={this.state.alias} 
                                onChange={this.handleAliasChange}/>
                            <span className="input-group-btn">
                                <button type="button" className="btn btn-primary btn-md" onClick={this.handleAddProject}>
                                    Add Project
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectAdd;