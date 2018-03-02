import React, { Component } from "react";

class ProjectAdd extends Component {
	constructor() {
        super();

        this.state = {
            alias: "",
            directory: ""
        };

        this.handleAliasChange = this.handleAliasChange.bind(this);
        this.handleDirectoryChange = this.handleDirectoryChange.bind(this);
        this.handleAddProject = this.handleAddProject.bind(this);
    }

    handleAliasChange(event) {
        this.setState({alias: event.target.value});
    }

    handleDirectoryChange(event) {
        this.setState({directory: event.target.value});
    }

    handleAddProject() {
        if(this.state.alias === "") {
            alert("Please populate the alias of the project");
            return;
        } 
        if(this.state.directory === "") {
            alert("Please populate the directory of the project (Where you store your project in your local machine)");
            return;
        }

        let project = {
            alias: this.state.alias,
            directory: this.state.directory
        };

        this.props.addProject(project);
    }

    render() {
        return (
            <div className="section-group">
                <div className="row">
                    <h3>Add a Project</h3>
                </div>
                <div className="row form-group align-items-center">
                    <div className="col-sm-3">
                        <label>Alias</label>
                        <input type="text" className="form-control" value={this.state.alias} 
                            onChange={this.handleAliasChange}/>
                    </div>
                    <div className="col-sm-6">
                        <label>Directory</label>
                        <input type="text" className="form-control" value={this.state.directory} 
                            onChange={this.handleDirectoryChange}/>
                    </div>
                    <div className="col-sm-3">
                        <button type="button" className="btn btn-primary" onClick={this.handleAddProject}>
							Add Project
						</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectAdd;