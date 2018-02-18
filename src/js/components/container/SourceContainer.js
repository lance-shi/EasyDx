import React, { Component } from "react";
import axios from 'axios';
import ProjectList from "../presentational/ProjectList";

class SourceContainer extends Component {
	constructor() {
		super();
		this.state = {
			projects: []
		};
		axios.get("/api/project").then((res) => {
            this.setState({
	        	projects: res.data
	        })
		});
	}

	render() {
		
		return (
			<ProjectList projects={this.state.projects} />
		)
	}
}

export default SourceContainer;