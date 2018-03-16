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
        let activeString = "";
        if(this.props.number === this.props.currentPage) {
            activeString = " active";
        }
		return (
            <li className={"page-item" + activeString}>
                <a href="#/" className="page-link" onClick={this.handleClick}>{this.props.number}</a>
            </li>   
		);
	}
}

export default PaginationItem;