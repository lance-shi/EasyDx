import React, { Component } from "react";
import SourceRow from "./SourceRow";

class Pagination extends React.Component {
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
		return (
            <ul className="pagination">
                <li className="page-item">
                    <a href="#" className="page-link" aria-label="Previous">
                        <span aria-hidden="true">Prev</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                <li className="page-item active">
                    <a href="#" className="page-link">1</a>
                </li>
                <li className="page-item">
                    <a href="#" className="page-link" aria-label="Next">
                        <span aria-hidden="true">Next</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
		);
	}
}

export default Pagination;