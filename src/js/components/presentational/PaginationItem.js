import React, { Component } from "react";
import SourceRow from "./SourceRow";

class PaginationItem extends Component {
	constructor() {
        super();
        
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.props.pageClick(this.props.number);
    }

	render() {
		return (
            <li className="page-item">
                <a href="#/" className="page-link" onClick={this.handleClick}>{this.props.number}</a>
            </li>   
		);
	}
}

export default PaginationItem;