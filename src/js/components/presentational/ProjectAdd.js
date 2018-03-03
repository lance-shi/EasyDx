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
            alert("Please populate the alias of the project");
            return;
        } 
        if(this.state.directory === "") {
            alert("Please populate the directory of the project (Where you store your project in your local machine)");
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
            <div className="section-group">
                <div className="row">
                    <h3>Add a Project</h3>
                </div>
                <div className="row">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th style={{width: "8%"}}>Default</th>
                                <th style={{width: "23%"}}>Alias</th>
                                <th style={{width: "54%"}}>Directory</th>
                                <th style={{width: "15%"}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="checkbox" defaultChecked={this.state.isDefault} 
                                        onChange={this.handleDefaultChange}/>
                                </td>
                                <td>
                                    <input type="text" className="form-control" value={this.state.alias} 
                                        onChange={this.handleAliasChange}/>
                                </td>   
                                <td>
                                    <input type="text" className="form-control" value={this.state.directory} 
                                        onChange={this.handleDirectoryChange}/>
                                </td>
                                <td>
                                    <button type="button" className="btn btn-primary" onClick={this.handleAddProject}>
                                        Add Project
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ProjectAdd;