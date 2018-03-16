import React, { Component } from "react";

class PaginationDot extends Component {
	render() {
		return (
            <li className="page-item disabled">
                <a href="#/" className="page-link">...</a>
            </li>
		);
	}
}

export default PaginationDot;