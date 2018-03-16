import React, { Component } from "react";
import PaginationItem from "./PaginationItem";
import PaginationDot from "./PaginationDot";

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
        let { currentPage, maxCount } = this.props;
        for (let i = 1; i <= maxCount && i <= currentPage + 2; i++) {
            if(i < currentPage - 1) {
                i = currentPage - 1;
            }
            pageNumbers.push(i);
        }
        let morePreviousExist = false;
        if(currentPage - 1 > 1) {
            morePreviousExist = true;
        }
        let moreNextExist = false;
        if(currentPage + 2 < maxCount) {
            moreNextExist = true;
        }

        let paginationItems = pageNumbers.map(number=><PaginationItem key={number} number={number}
			currentPage={currentPage} pageClick={this.props.pageClick}/>);
		return (
            <ul className="pagination">
                <li className="page-item">
                    <a href="javascript:;" className="page-link" aria-label="Previous" onClick={this.handlePreviousClick}>
                        <span aria-hidden="true">Prev</span>
                        <span className="sr-only">Previous</span>
                    </a>
                </li>
                {morePreviousExist? <PaginationDot/>: null}
                {paginationItems}
                {moreNextExist? <PaginationDot/>: null}
                {moreNextExist? <PaginationItem key={maxCount} number={maxCount}
                    currentPage={currentPage} 
                    pageClick={this.props.pageClick}/>: null}
                <li className="page-item">
                    <a href="javascript:;" className="page-link" aria-label="Next" onClick={this.handleNextClick}>
                        <span aria-hidden="true">Next</span>
                        <span className="sr-only">Next</span>
                    </a>
                </li>
            </ul>
		);
	}
}

export default Pagination;