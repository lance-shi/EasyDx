import React, { Component } from "react";
import SourceRow from "./SourceRow";
import PaginationItem from "./PaginationItem";

class Pagination extends Component {
	constructor() {
		super();

        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
    }
    
    handlePreviousClick() {
        if(this.props.currentPage > 1) {
            this.props.pageClick(this.props.currentPage - 1);
        }
    }

    handleNextClick() {
        if(this.props.currentPage < this.props.maxCount) {
            this.props.pageClick(this.props.currentPage + 1);
        }
    }

	render() {
        let pageNumbers = [];
        for (let i = 1; i <= this.props.maxCount; i++) {
            pageNumbers.push(i);
        }
        let paginationItems = pageNumbers.map(number=><PaginationItem key={number} number={number}
			currentPage={this.props.currentPage} pageClick={this.props.pageClick}/>);
		return (
            <ul className="pagination">
                <li className="page-item">
                    <a href="#/" className="page-link" aria-label="Previous" onClick={this.handlePreviousClick}>
                        <span aria-hidden="true">Prev</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                {paginationItems}
                <li className="page-item">
                    <a href="#/" className="page-link" aria-label="Next" onClick={this.handleNextClick}>
                        <span aria-hidden="true">Next</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
		);
	}
}

export default Pagination;